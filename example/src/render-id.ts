import {App} from "../../src";
import UserId from "./user-attrs/id";
import {Component1, Component2} from "./view-components/id-html";
import IdDistribution from "./view-filters/id-distribution";

const app = new App();
app.user.use(new UserId());
app.view.useFilter(new IdDistribution());
app.view.use(new Component1());
app.view.use(new Component2());