const fs=require('fs')

var today = new Date();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;


const writeToFile=(Activities)=>{
    var input;
    if(fs.existsSync('Activities.json')){
        try{
            input=JSON.parse(fs.readFileSync("Activities.json"));
        }catch(err){
            console.log('Activities.json is empty, creating empty object to start with.')
            input={}
        }
    }else{
        input={};
    }
    
    input[today]={Activities,time};
    
    // console.log(input);
    fs.writeFileSync('Activities.json',JSON.stringify(input));
}

const activitiesToWatch=JSON.parse(fs.readFileSync('watch.txt'));

module.exports={
    writeToFile,
    watchlist:activitiesToWatch.watch,
    SLEEP_TIME:Number(activitiesToWatch.SLEEP_TIME)
}