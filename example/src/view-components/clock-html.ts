import {ViewComponent} from "../../../src";

function renderClock(time:Date){
  return `<h1>== clock ==</h1>
    <div>${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}</div>
    <div>${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}</div>
  `
}

export default class ClockHTML extends ViewComponent{
  id : "clock-html";
  render(user:any){
    const clock = user["clock"];
    if (clock) {
      const html = renderClock(clock.time);
      const box = document.querySelector("#clock");
      if(box) box.innerHTML = html;
    }
  }
}