import {App} from "../../src";
import UserProfile from "./user-attrs/profile";
import ConsoleUser from "./view-components/console-user";

const app = new App();
app.user.use(new UserProfile());
app.view.use(new ConsoleUser());
