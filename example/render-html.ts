import {App} from "../src";
import UserProfile from "./user-attrs/profile";
import UserHTML from "./view-loaders/user-html";

const app = new App();
app.view.setLoader(new UserHTML());
app.user.use(new UserProfile());