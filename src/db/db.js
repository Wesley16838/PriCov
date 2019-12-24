const mongoCollections = require("./mongoCollections");
const connection = require("./mongoConnection");
const users = mongoCollections.users;
const history = mongoCollections.history;
const statistics = mongoCollections.statistics;
const ObjectID = require('mongodb').ObjectID;

//User
async function getuser(email){
    console.log('get user')
    const userCollection = await users();
    const target = await userCollection.findOne({ email: email });
    console.log('target,',target)
    if(target === null) throw 'user not found!';

    return target;

}

async function getuserbyid(id){
    // if(id === undefined){
    //     throw 'input is empty';
    // }
    // if(id.constructor != ObjectID){
    //     if(ObjectID.isValid(id)){
    //         id = new ObjectID(id);
    //     }
    //     else{
    //         throw 'Id is invalid!(in user.get)'
    //     }
    // }

    const userCollection = await users();
    const target = await userCollection.findOne({ _id: id });
    if(target === null) throw 'user'+id+' not found!';

    return target;
}

async function getAllUser(){
    const userCollection = await users();
    const targets = await userCollection.find().toArray();
    if(targets.length === 0) throw 'user not found!';

    return targets;
}

async function adduser(email) {
    console.log('add user')
    let newuser = {
        email: email
    }
     
    const userCollection = await users();
    const existone = await userCollection.findOne({ email:email })
    console.log('existone,',existone)
    if(existone != null){
        console.log('exist')
        return existone
    }else{
        console.log('does not exist')
        const InsertInfo = await userCollection.insertOne(newuser);
        if (InsertInfo.insertedCount === 0) throw 'Insert fail!';
       
        return await getuserbyid(InsertInfo.insertedId);
    }
}

async function updateuser(id , email){
    if(id === undefined){
        throw 'input is empty';
    }
    if(id.constructor != ObjectID){
        if(ObjectID.isValid(id)){
            id = new ObjectID(id);
        }
        else{
            throw 'Id is invalid!(in history.get)'
        }
    }
    let updateduser = {
        $set: {
            email: email
        }
    }

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne({ _id: id } , updateduser);
    if (updateInfo.modifiedCount === 0) throw 'Insert fail!';

    return await getuserbyid(id);
}

async function deluser(email){
    let todel = await getuser(email);

    const userCollection = await users();
    const deleteInfo = await userCollection.removeOne({ _id: todel._id });
    if (deleteInfo.deletedCount === 0) throw 'Insert fail!';

    const historyCollection = await history();
    const updatehistory = await historyCollection.deleteMany({ user: todel._id.toString() });

    return todel;
}

//History
async function gethistory(id){
    if(id === undefined){
        throw 'input is empty';
    }
    if(id.constructor != ObjectID){
        if(ObjectID.isValid(id)){
            id = new ObjectID(id);
        }
        else{
            throw 'Id is invalid!(in history.get)'
        }
    }

    const historyCollection = await history();
    const target = await historyCollection.find({ _id: id });
    if(target === null) throw 'history not found!';

    return target;
}

async function gethistorybyuser(uid){
    const historyCollection = await history();
    const targets = await historyCollection.find({ user: uid.toString() }).toArray();
    // console.log("in gethistorybyuser")
    // console.log(uid.toString())
    if(targets === null) throw 'history not found!';

    return targets;
}

async function gethistorybyuserkw(uid , keyword){
    const historyCollection = await history();
    const targets = await historyCollection.find({ user: uid.toString(), keyword: keyword }).toArray();
    // console.log("in gethistorybyuserkw")
    // console.log(uid.toString())
    if(targets === null) throw 'history not found!';

    return targets;
}

async function addHistory(title , price , sale , url , img , user , keyword) {
    let newhistory = {
        title: title,
        price: price,
        sale: sale,
        url: url,
        img: img,
        user: user,
        keyword: keyword
    }
    const historyCollection = await history();
    const InsertInfo = await historyCollection.insertOne(newhistory);
    user = new ObjectID(user);
    return await getuserbyid(user);
}

async function delHistory(user , keyword) {
    const historyCollection = await history();
    const InsertInfo = await historyCollection.deleteMany({ user: user, keyword: keyword });
    user = new ObjectID(user);
    return await getuserbyid(user);
}

//Statistics
async function getstatistic(){
    const statisticsCollection = await statistics();
    const targets = await statisticsCollection.find().toArray();
    if(targets === null) throw 'user not found!';

    return targets;
}

async function addstatistic(website, department){
    const statisticsCollection = await statistics();
    const target = await statisticsCollection.findOne({ website: website });
    if(target === null) {
        let obj = {};
        obj[department] = 1;
        let newwebsite = {
            website: website,
            department: obj
        }
        let inserted = await statisticsCollection.insertOne(newwebsite);
    }
    else{
        let updateduser = null;
        let obj = target.department
        if(obj[department] == undefined){
            obj[department] = 1;
            updateduser = {
                $set: {
                    department: obj
                }
            }
        }
        else{
            obj[department] = obj[department]+1;
            updateduser = {
                $set: {
                    department: obj
                }
            }
        }
        let inserted = await statisticsCollection.updateOne({ _id: new ObjectID(target._id) } , updateduser);
    }
}

// Other

function contains(title , keyword) {
    title = title.toLowerCase()
    keyword = keyword.toLowerCase()
    if(title.length < keyword.length) return false;
    for(var x = 0 ; x < title.length - keyword.length ; x++) {
        if(title.charAt(x) == keyword.charAt(0)){
            var y = 0;
            for(y = 0 ; y < keyword.length ; y++) {
                if(title.charAt(x+y) != keyword.charAt(y)) break;
            }
            if(y == keyword.length) return true;
        }
    }
    return false;
}

module.exports = {
    getuser,
    getuserbyid,
    getAllUser,
    adduser,
    updateuser,
    deluser,
    gethistorybyuser,
    gethistorybyuserkw,
    addHistory,
    delHistory,
    getstatistic,
    addstatistic,
    contains
};