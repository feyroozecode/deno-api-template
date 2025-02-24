import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "./controllers/template.controller.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "Hello World! go to /api/items";
  })
  .get("/api/items", getItems)
  .get("/api/items/:id", getItem)
  .post("/api/items", createItem)
  .put("/api/items/:id", updateItem)
  .delete("/api/items/:id", deleteItem);

export default router;