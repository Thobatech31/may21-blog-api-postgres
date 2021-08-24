import { Router } from "express";

import * as authorsHandlers from "./handlers.js";

const route = Router();

route.get("/", authorsHandlers.list);

route.get("/:author_id", authorsHandlers.single);

route.put("/:author_id", authorsHandlers.update);

route.delete("/:author_id", authorsHandlers.deleteAuthor);

route.post("/", authorsHandlers.create);

export default route;
