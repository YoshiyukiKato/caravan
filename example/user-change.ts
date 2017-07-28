import * as Promise from "bluebird";
import {App,UserLoader,ViewLoader,UserSensor} from "../src";
import * as $ from "jquery";

import UserProfile from "./user-loaders/user-profile";
import After5Sec from "./user-sensors/after-5-sec";
import ConsoleUser from "./view-loaders/console-user";

const app = new App();
app.setViewLoader(new ConsoleUser());

const ul = new UserLoader();
ul.use(new UserProfile());
app.setUserLoader(ul);

const us = new UserSensor();
us.use(new After5Sec());
app.setUserSensor(us);