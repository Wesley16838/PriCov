const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const db = require('./db');
const cors = require('cors');
const path = require('path')
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const axios = require('axios');
const app = express();
const typeDefs = gql`

    type User {
        _id: ID!
        email: String!
        History: [History!]
    }

    type History {
        _id: ID!
        title: String!
        price: String!
        sale: String!
        url: String!
        img: String!
        user: String!
        keyword: String!
    }

    type Statistic {
        _id: ID!
        website: String!
        department: [Department!]
    }

    type Department {
        name: String!
        amount: Int!
    }


    type Query {
        feed: [User!]
        finduser(email: String!): User
        findHistory(email: String, keyword: String!): [History!]
        getstat: [Statistic!]
    }

    type Mutation {
        adduser(email: String!): User
        addhistory(title: String! , price: String! , sale: String! , url: String! , img: String! , user: ID! , keyword: String!): User
        updateuser(_id: ID! , email: String!): User
        deleteuser(email: String!): User
        webmine(email: String!, keyword: String!, website: [String]!): User
    }
`;

const resolvers = {
    Query: {
        feed: async (parents, args, context, info) => {
            var dbf = db.dbfunction;
        
            const out = await dbf.getAllUser();
         
            return out;
        },
        finduser: async (parents, args, context, info) => {
            var dbf = db.dbfunction;
          
            const target = await dbf.getuser(args.email)
      
            return target;
        },
        getstat: async (parents, args, context, info) => {
        
            var dbf = db.dbfunction;
            const inserted = await dbf.getstatistic();
        
            return inserted;
        },
        findHistory: async (parents, args, context, info) => {
            var dbf = db.dbfunction;
            const user = await dbf.getuser(args.email);
            const targets = await dbf.gethistorybyuserkw(user._id, args.keyword);
            return targets;
        }
    },
    Mutation: {

        adduser: async (parents, args, context, info) => {
            var dbf = db.dbfunction;
            let out = await dbf.adduser(args.email)
            console.log('out in adduser');
            console.log(out);
            return out

        },
        addhistory: async (parents, args, context, info) => {
            var dbf = db.dbfunction;
            let out = await dbf.addHistory(args.title, args.price, args.sale, args.url, args.img, args.user, args.keyword)
            console.log('out in addhistory');
            console.log(out);
            return out;
        },
        updateuser: async (parents, args, context, info) => {
            var dbf = db.dbfunction;
            let out = await dbf.updateuser(args._id, args.email);
            console.log('out in updateuser');
            console.log(out);
            return out;
        },
        deleteuser: async (parents, args, context, info) => {
            var dbf = db.dbfunction;
            let out = await dbf.deluser(args.email);
            console.log('out in deluser');
            console.log(out);
            return out;
        },
        webmine: async (parents, args, context, info) => {
            console.log('webmine!')
            console.log('args,',args)
            var dbf = db.dbfunction;
            console.log('1')
            var user = await dbf.getuser(args.email)
            console.log('2')
            var todel = await dbf.delHistory(user._id.toString(), args.keyword)
            console.log('3')
            for (var web = 0; web < args.website.length; web++) {
                if (args.website[web].toLowerCase() == 'amazon') {
                    console.log('in amazon')
                    // var response = await axios({
                    //     method:"get",
                    //     url:"/amazon?keyword=" + args.keyword,
                    //     baseURL : process.env.baseURL || "https://pricov.herokuapp.com:3001"
                    // })
                     var response = await axios.get(
                         'http://localhost:3001/amazon?keyword=' + args.keyword
                     
                    )
                    var arr = response.data.split('\n')
                    
                    console.log('arr,',arr);
                    var x = 0;
                    var end = 0;
                    while (end < 10 && x < arr.length) {
                        var obj = arr[x].split('\t')
                        var kw = args.keyword.split('+')
                        x++;
                        if(obj.length < 5) continue
                        if (obj[0].length == 0 || obj[1].length == 0 || obj[2].length == 0 || obj[3].length == 0 || obj[4].length == 0) continue;
                        if (obj[1] == 'NA.NA') continue;
                        if(!dbf.contains(obj[0],kw[0])) continue
                        price = ''
                        sale = ''
                        if (obj[2] != 'NA') {
                            price = obj[2].replace('$', '');
                            sale = obj[1];
                        }
                        else {
                            price = obj[1];
                            sale = obj[2];
                        }
                        var addrd = await dbf.addHistory(obj[0], price, sale, obj[3], obj[4], user._id.toString(), args.keyword);
                        end++;
                    }
                    await dbf.addstatistic('amazon', args.keyword);
                }
                else if (args.website[web].toLowerCase() == 'ebay') {
                    // Impelment py here
                    var response = await axios.get('http://localhost:3001/ebay?keyword=' + args.keyword)
                    var arr = response.data.split('\n')
                    var kw = args.keyword.split('+')
                    console.log('in wibmine ebay');
                    // console.log(arr)
                    var x = 0;
                    var end = 0;
                    while (end < 10 && x < arr.length) {
                        var obj = arr[x].split('\t')
                        x++;
                        if(obj.length < 5) continue
                        if (obj[0].length == 0 || obj[1].length == 0 || obj[2].length == 0 || obj[3].length == 0 || obj[4].length == 0) continue;
                        if(!dbf.contains(obj[0],kw[0])) continue
                        var addrd = await dbf.addHistory(obj[0], obj[1], obj[2], obj[3], obj[4], user._id.toString(), args.keyword);
                        end++;
                    }
                    await dbf.addstatistic('ebay', args.keyword);
                    console.log('Ebay!');
                }
                else if (args.website[web].toLowerCase() == 'bestbuy') {
                    console.log('in bestbuy')
                    // Impelment py here
                    var response = await axios.get('http://localhost:3001/bestbuy?keyword=' + args.keyword)
                    var arr = response.data.split('\n')
                    var kw = args.keyword.split('+')
                    console.log('in wibmine bestbuy');
                    console.log(arr)
                    var x = 0;
                    var end = 0;
                    while (end < 10 && x < arr.length) {
                        var obj = arr[x].split('\t')
                        x++;
                        if(obj.length < 5) continue
                        if (obj[0].length == 0 || obj[1].length == 0 || obj[2].length == 0 || obj[3].length == 0 || obj[4].length == 0) continue;
                        if(!dbf.contains(obj[0],kw[0])) continue
                        var addrd = await dbf.addHistory(obj[0], obj[1], obj[2], obj[3], obj[4], user._id.toString(), args.keyword);
                        end++;
                    }
                    await dbf.addstatistic('bestbuy', args.keyword);
                    console.log('Best Buy!');
                }
                else {
                    // Impelment py here
                    await dbf.addstatistic('other', args.keyword);
                    console.log('Other!')
                }
            }

            return await dbf.getuser(args.email)
        }
    },
    User: {
        _id: (parents) => parents._id,
        email: (parents) => parents.email,
        History: async (parents, args, context, info) => {
            console.log("in user history")
            var dbf = db.dbfunction;
            let out = await dbf.gethistorybyuser(parents._id);
            out.sort((a, b) => {
                var ca, cb;
                if (a.sale != 'NA') ca = a.sale;
                else ca = a.price;
                if (b.sale != 'NA') cb = b.sale;
                else cb = b.price;
                return parseInt(ca, 10) - parseInt(cb, 10);
            })
      
            return out;
        },
    },
    History: {
        _id: (parents) => parents._id,
        title: (parents) => parents.title,
        price: (parents) => parents.price,
        sale: (parents) => parents.sale,
        url: (parents) => parents.url,
        img: (parents) => parents.img,
        user: (parents) => parents.user,
        keyword: (parents) => parents.keyword,
    },
    Statistic: {
        _id: (parents) => parents._id,
        website: (parents) => parents.website,
        department: (parents) => {
            const data = parents.department;
            var out = new Array(0);
            for (s in data) {
                var obj = { name: s, amount: data[s] }
                out.push(obj);
            }
            console.log('in statistic')
            console.log(out)
            return out;
        }
    },
    Department: {
        name: (parents) => parents.name,
        amount: (parents) => parents.amount
    }
  };

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({app})  
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
  }));
app.use(express.static('public'));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public','index.html'))
})
const PORT = process.env.PORT || 5000;
// The `listen` method launches a web server.
app.listen(PORT,()=>console.log(`🚀  Server ready at 5000`))
