import * as Promise from "bluebird";
import {App,UserLoader,LoaderUnit,ViewLoader} from "../src";
import * as $ from "jquery";

import UserProfile from "./user-loaders/user-profile";
import UserHTML from "./view-loaders/user-html";

const app = new App();
app.setViewLoader(new UserHTML());

const ul = new UserLoader();
ul.use(new UserProfile());
app.setUserLoader(ul);