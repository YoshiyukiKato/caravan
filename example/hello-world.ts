import {App,ViewLoader} from "../src";

import UserProfile from "./user-attrs/profile";
import ConsoleUser from "./view-loaders/console-user";


const app = new App();
app.user.use(new UserProfile());
app.view.setLoader(new ConsoleUser());
