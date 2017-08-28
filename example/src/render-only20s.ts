import {App} from "../../src";
import UserProfile from "./user-attrs/profile";
import Only20sHTML from "./view-components/only20s-html";
import Only20s from "./view-filters/only20s";

const app = new App();
app.user.use(new UserProfile());
app.view.useFilter(new Only20s());
app.view.use(new Only20sHTML());