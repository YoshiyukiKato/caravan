import {App} from "../../src";
import UserProfile from "./user-attrs/profile";
import ProfileReact from "./view-components/profile-react";

const app = new App();
app.user.use(new UserProfile());
app.view.use(new ProfileReact());