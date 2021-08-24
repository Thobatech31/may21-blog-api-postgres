import { Router } from "express";

import * as authorsHandlers from "./handlers.js";

const route = Router();

route.get("/", authorsHandlers.list);

export default route;
