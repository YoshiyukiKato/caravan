import {App} from "../../src";
import UserProfile from "./user-attrs/profile";
import ProfileHTML from "./view-components/profile-html";

const app = new App();
app.view.use(new ProfileHTML());
app.user.use(new UserProfile());