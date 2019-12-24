var db = require('./db/db')
const fs = require('fs')
async function main(email, keyword) {
    var spawn = require("child_process");
    var process = spawn.spawnSync('python', ["./amazon.py", keyword]);

    var data = fs.readFileSync("./amazon.txt");
    // console.log(data.toString())
    var arr = data.toString().split('\n')
    console.log('email', email)
    const user = await db.getuser(email)
    const del = await db.delHistory(user._id.toString(), keyword)
    console.log(user)
    for (var x = 0; x < 20; x++) {
        line = arr[x].split('\t')
        const tmp = await db.addHistory(line[0], line[1], line[2], line[3], line[4], user._id.toString(), keyword)
    }
    return await db.getuser(email)
}

module.exports = {
    main
}