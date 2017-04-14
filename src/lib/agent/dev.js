import Core from "./core";

export default class Dev extends Core{
  constructor(props){
    super(props);
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if(message){
        if(message.services){
          this.onLoadServices();
        }else if(message.dataSources){
          this.onLoadDataSources();
        }
      }
    });
  }

  onLoadServices(services){
    services.forEach((service) => {
      const script = document.createElement("script");
      if(service.type === "remote"){  
        script.src = `https://s3-ap-northeast-1.amazonaws.com/gizmo-assets/public/${service.id}.js`;
      }

      if(service.type === "local"){
        //localのものについては、裏側でwrapする
        script.innerHTML = service.script;
      }
      document.body.appendChild(script);
    });
  }
  
  onLoadDataSources(dataSources){
    //使いやすい形に整形することになるはず
    this.dataSources = dataSources;
  }
  
  loadServices(){
    const message = { type : "services" };
    chrome.runtime.sendMessage(message);
  }

  loadDataSources(){
    const message = { type : "data_sources" };
    chrome.runtime.sendMessage(message);
  }
}