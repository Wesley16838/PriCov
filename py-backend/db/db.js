const mongoCollections = require("./mongoCollections");
const connection = require("./mongoConnection");
const users = mongoCollections.users;
const history = mongoCollections.history;
const statistics = mongoCollections.statistics;
const ObjectID = require('mongodb').ObjectID;

//User
async function getuser(email){
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
    const target = await userCollection.findOne({ email: email });
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
    if(targets === null) throw 'user not found!';

    return targets;
}

async function adduser(email) {
    let newuser = {
        email: email
    }

    const userCollection = await users();
    const InsertInfo = await userCollection.insertOne(newuser);
    if (InsertInfo.insertedCount === 0) throw 'Insert fail!';

    return await getuser(InsertInfo.insertedId);
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

    return await getuser(id);
}

async function deluser(id){
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

    let todel = await getuser(id);

    const userCollection = await users();
    const deleteInfo = await userCollection.removeOne({ _id: id });
    if (deleteInfo.deletedCount === 0) throw 'Insert fail!';

    const historyCollection = await history();
    const updatehistory = await historyCollection.update({ user: id.toString() } , { $set: { user: "NA" }});

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
    getuser,
    getAllUser,
    adduser,
    updateuser,
    deluser,
    gethistorybyuser,
    addHistory,
    delHistory,
    getstatistic,
    addstatistic
};