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
  id:string = "profile";
  value:UserProfileSchema = { name : "", age : 0 };
  init(){
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
  - the `dev` mode exports following methods to global scope
    - `app.user.setAttrs` => `window.__import_user_attrs_value__`
    - `app.user.import` => `window.__import_user_attr__`
    - `app.view.import` => `window.__import_view_component__`

```ts
const app = new App(mode);
```

#### app.user
An instance of [User](#user) class.
#### app.view
An instance of [View](#view) class.
### User
#### User.use(userAttr)
##### params :
- userAttr : [UserAttr](#userattr)
#### User.import(attrName, attrValue, attrInitFunction)
##### params :
- attrName : string
- attrValue : any
- attrInitFunction : () => any
#### User.setAttrs(attrs)
##### params :
- attrs : any
##### return : boolean

### UserAttr
```ts
interface UserProfileSchema{
  name : sting;
  age : number;
}

class UserProfile extends UserAttr<UserProfileSchema>{
  id:string = "profile";
  value:UserProfileSchema = { name : "", age : 0 };
  init(){
    //get value from somewhere like API, cookie, etc.
    this.set({
      name : "taro",
      age : 20
    });
  }
}
```

#### UserAttr.init()
### View
#### View.use(viewComponent)
##### params : 
- viewComponent : [ViewComponent](#viewcomponent)
#### View.useFilter(viewFilter)
##### params : 
- viewFilter : [ViewFilter](#viewfilter)
#### View.import(componentId, renderFunction)
##### params :
- componentId : string
- renderFunction : (userAttrs) => any
  - userAttrs : any
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
#### ViewComponent.render(userAttrs)
##### params : 
- userAttrs : any
### ViewFilter
```ts
interface UserSchema{
  profile:UserProfileSchema
}

class Only20s extends ViewFilter{
  componentId:"my-component";
  validate(userAttrs:UserSchema, componentId:string){
    const age = userAttrs["profile"].age;
    if(!age) return false;
    return 20 <= age && age < 30;
  }
}
```
#### ViewFilter.validate(userAttrs, componentId)
##### params : 
- userAttrs : any
- componentId : string
## LICENSE
MIT
