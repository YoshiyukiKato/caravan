# Gimmickry
Application framework by user adaptive micro view components.

## usage

```ts
import {App, UserAttr, ViewComponent} from "path/to/Gimmickry";

interface UserProfileSchema{
  name : string;
  age : number;
}

class UserProfile extends UserAttr<UserProfileSchema>{
  public name:string = "profile";
  public value:UserProfileSchema = { name : "", age : "" };
  load(){
    //get value from somewhere like API, cookie, etc.
    this.set({
      name : "taro",
      age : 20
    });
  }
}

interface UserSchema{
  profile:UserProfileSchema
}

class RenderHTML extends ViewComponent{
  id : "render-html";
  render(user:UserSchema){
    document.querySelector("#user-profile") = `
      <div>name : ${user.proile.name}</div>
      <div>age : ${user.proile.age}</div>
    `;
  }
}

const app = new App();
app.user.use(new UserProfile());
app.view.use(new UserHTML())
```

## LICENSE
MIT
