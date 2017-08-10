import Promise from "bluebird";
import {App,PropsLoader,LoaderUnit,ViewLoader} from "../src";
import * as $ from "jquery";

import UserProfile from "./user-loaders/user-profile";
import UserHTML from "./view-loaders/user-html";

const app = new App();
app.view.setLoader(new UserHTML());

const ul = new PropsLoader();
ul.use(new UserProfile());
app.user.setPropsLoader(ul);