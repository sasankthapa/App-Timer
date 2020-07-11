const monitor=require('active-window')
const {writeToFile,watchlist,SLEEP_TIME}=require('./FileIO')

const activityList=[]; //activities in array
const activityMap={};
let currentActivity;

class Activity{
    constructor(name, time){
        this.name=name;
        this.time=time;
    }

    updateTime(){
        this.time+=SLEEP_TIME;
    }

    addTime(time){
        this.time+=time;
    }

    getObject(){
        return this;
    }
}

const compareAppWithWatchList=(name)=>{
    for(var i=0;i<watchlist.length;i++){
        var element=watchlist[i];
        var patt=new RegExp(element,"i");
        if(name.match(patt)){
            return [true,element];
        }
    }
    return [false,null];
}

const callback=(data)=>{
    var [result,value]=compareAppWithWatchList(data.app + data.title)
    if(!result){
        value='other'
    }

    if(!currentActivity){
        currentActivity=new Activity(value,0);
        return;
    }

    if(value!==currentActivity.name){
        currentActivity.updateTime();
        if(currentActivity.name in activityMap){
            activityList[activityMap[currentActivity.name]].addTime(currentActivity.time);
        }else{
            var length=activityList.push(currentActivity.getObject());
            activityMap[currentActivity.name]=length-1;
        }
        writeToFile(activityList);
        currentActivity=new Activity(value,0);
    }else{
        currentActivity.updateTime();
    }
}

monitor.getActiveWindow(callback)
setInterval(()=>monitor.getActiveWindow(callback),SLEEP_TIME*1000);