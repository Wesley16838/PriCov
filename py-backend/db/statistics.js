const mongoCollections = require("./mongoCollections");
const connection = require("./mongoConnection");
const statistics = mongoCollections.statistics;
const ObjectID = require('mongodb').ObjectID;

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
        return await get();
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

        return await get();
    }
}

module.exports = {
    getstatistic,
    addstatistic
};

async function dummy(){
    const statisticsCollection = await statistics();
    let obj = {
        mobile: 100,
        laptop: 25,
        iphone: 107,
        samsung: 110,
        huawei: 0
    }
    let newwebsite = {
        website: 'amazon',
        department: obj
    }
    //let target = await statisticsCollection.insertOne(newwebsite);

    obj = {
        mobile: 80,
        laptop: 45,
        iphone: 97,
        samsung: 95,
        huawei: 0
    }
    newwebsite = {
        website: 'target',
        department: obj
    }
    //target = await statisticsCollection.insertOne(newwebsite);

    obj = {
        mobile: 99,
        laptop: 30,
        iphone: 95,
        samsung: 87,
        huawei: 0
    }
    newwebsite = {
        website: 'bestbuy',
        department: obj
    }
    //target = await statisticsCollection.insertOne(newwebsite);

    //let x = await add('amazon' , 'desktop');
    let y = await add('ebay' , 'iphone')
    target = await get();
    console.log(target);
}

//dummy();