# Gimmickry
Gimmick; a function adapts UI/UX for a user according to his/her attributes.

## motivation
To provide user-adaptive UI/UX conveniently.

- user-driven view rendering
- stateful user attributes
- small and encapsulated view component

# usage

```ts
import {App, UserAttr, ViewComponent} from "path/to/Gimmickry";

interface UserProfileSchema{
  name : sting;
  age : number;
}

class UserProfile extends UserAttr<UserProfileSchema>{
  name:string = "profile";
  value:UserProfileSchema = { name : "", age : 0 };
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
  id:string = "render-html";
  render(user:UserSchema){
    document.querySelector("#user-profile").innerHTML = `
      <div>name : ${user.proile.name}</div>
      <div>age : ${user.proile.age}</div>
    `;
  }
}

const app = new App();
app.user.use(new UserProfile());
app.view.use(new RenderHTML());
```



## LICENSE
MIT
