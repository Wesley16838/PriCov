var f = require('./js2py')

async function qq(){
    var x = await f.main('someemail@email.com','amazon+laptop')
    console.log(x)
    return;
}
qq()