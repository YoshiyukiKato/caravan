# Gimmickry
> Gimmick: a function adapts UI/UX for a user according to his/her attributes.

## motivation
To provide user-adaptive UI/UX conveniently.

- user-driven view rendering
- stateful user attributes
- small and encapsulated view component

## usage

```ts
import {App, UserAttr, ViewComponent} from "gimmickry";

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

## try example
1. clone this repo

```console
$ git clone https://github.com/YoshiyukiKato/gimmickry.git
```

2. install packages
```console
$ cd gimmickry
$ npm install
```

3. run dev server
```console
$ npm run server
```

And then, please visit `http://localhost:9000` to see some simple examples.
Those examples' source are in `example/src` directory.

## API
### App
#### App(mode)
- mode(optional)
  - `"dev"|"prod"` (default is `"dev"`).
  - the `dev` mode exports `app.user.import` and `app.view.import` as `window.__import_user__` and `window.__import_view__`.

```ts
const app = new App(mode);
```

#### app.user
An instance of [User](#user) class.
#### app.view
An instance of [View](#view) class.
### User
#### User.use([UserAttr](#userAttr));
### UserAttr
```ts
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
```

### View
#### View.use([ViewComponent](#viewComponent))
#### View.useFilter([ViewFilter](#viewFilter))
### ViewComponent
```ts
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
```

### ViewFilter
```ts
interface UserSchema{
  profile:UserProfileSchema
}

class Only20s extends ViewFilter{
  componentId:"my-component";
  validate(userAttrs:UserSchema, componentId:string){
    const age = userAttrs["user-profile"].age;
    if(!age) return false;
    return 20 <= age && age < 30;
  }
}
```

## LICENSE
MIT
