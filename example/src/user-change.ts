import {App} from "../../src";

import UserProfile from "./user-attrs/profile";
import After5Sec from "./user-attrs/after-5-sec";
import ConsoleUser from "./view-components/console-user";

const app = new App();
app.view.use(new ConsoleUser());
app.user.use(new UserProfile());
app.user.use(new After5Sec());