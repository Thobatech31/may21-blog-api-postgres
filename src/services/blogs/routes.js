import { Router } from "express";

import * as blogsHandlers from "./handlers.js";

const route = Router();

route.get("/", blogsHandlers.list);

route.get("/:blog_id", blogsHandlers.single);

route.put("/:blog_id", blogsHandlers.update);

route.delete("/:blog_id", blogsHandlers.deleteAuthor);

route.post("/", blogsHandlers.create);

export default route;
