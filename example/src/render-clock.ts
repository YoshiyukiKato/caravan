import {App} from "../../src";
import UserProfile from "./user-attrs/profile";
import Clock from "./user-attrs/clock";
import ClockHTML from "./view-components/clock-html";

const app = new App();
app.view.use(new ClockHTML());
app.user.use(new UserProfile());
app.user.use(new Clock());