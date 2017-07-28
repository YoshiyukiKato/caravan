import * as Promise from "bluebird";
import {App,UserLoader,ViewLoader} from "../src";

import UserProfile from "./user-loaders/user-profile";
import ConsoleUser from "./view-loaders/console-user";


const app = new App();
app.setViewLoader(new ConsoleUser());

const ul = new UserLoader();
ul.use(new UserProfile());
app.setUserLoader(ul);