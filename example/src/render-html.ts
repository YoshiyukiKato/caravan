import {App} from "../src";
import UserProfile from "./user-attrs/profile";
import UserHTML from "./view-components/user-html";

const app = new App();
app.view.use(new UserHTML());
app.user.use(new UserProfile());