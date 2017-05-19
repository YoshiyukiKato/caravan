export default class TriggerManager{
  constructor(){
    this.triggers = {};
  }

  get events(){
    
  }

  add(triggerName, eventSequence){

  }
  
  remove(){

  }
}

class Trigger{
  constructor(triggerName, steps){
    this.name = triggerName;
    this.progress = 0;
    this.passed = [];
    this.steps = steps;
  }

  next(stepNum){
    this.progress = stepNum;
    const step = this.steps[this.progress];
    const onDone = this.next.bind(this, this.progress + 1);
    const onTimeout = this.next.bind(this, 0); //タイムアウトしたら最初に戻る
    const stepObj = this.type === "interval" ? new StepInterval(step.interval, onDone) : new StepEvent(step.type, step.target, onDone);
  }
}

class StepInterval{
  constructor(interval, onDone){
    this.interval = interval;
    this.onDone = onDone;
  }
  
  activate(){
    setTimeout(this.onDone, this.interval);
  }
}

class StepEvent{
  constructor(type, target, onDone){
    this.type = type;
    this.target = target;
    this.onDone = onDone;
  }

  activate(){
    this.cb = function(){
      this.unsubscribe();
      this.onDone();
    }.bind(this);
    document.querySelector(this.target).addEventListener(this.type, this.cb);
  }
  
  deactivate(){
    document.querySelector(this.target).removeEventListener(this.type, this.cb);
  }
}