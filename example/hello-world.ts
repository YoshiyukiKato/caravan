import * as Promise from "bluebird";
import {App,PropsLoader,ViewLoader} from "../src";

import UserProfile from "./user-loaders/user-profile";
import ConsoleUser from "./view-loaders/console-user";


const app = new App();
app.view.setLoader(new ConsoleUser());

const ul = new PropsLoader();
ul.use(new UserProfile());
app.user.setPropsLoader(ul);