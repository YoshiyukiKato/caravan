import Promise from "bluebird";
import {App,PropsLoader,ViewLoader,StateSensor} from "../src";
import * as $ from "jquery";

import UserProfile from "./user-loaders/user-profile";
import After5Sec from "./user-sensors/after-5-sec";
import ConsoleUser from "./view-loaders/console-user";

const app = new App();
app.setViewLoader(new ConsoleUser());

const pl = new PropsLoader();
pl.use(new UserProfile());
app.user.setPropsLoader(pl);

const ss = new StateSensor();
ss.use(new After5Sec());
app.user.setStateSensor(ss);