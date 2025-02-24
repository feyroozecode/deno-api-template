import { Context } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std@0.203.0/uuid/mod.ts";
import { items } from "../data/db.ts";

// Temporary in-memory storage
interface Item {
  id: string;
  name: string;
  description: string;
}

// GET all items
export const getItems = (ctx: Context) => {
  ctx.response.body = items;
};

// GET single item
export const getItem = (ctx: Context) => {
  const item = items.find((i: Item) => i.id === ctx.params.id);
  if (!item) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Item not found" };
    return;
  }
  ctx.response.body = item;
};

// CREATE item
export const createItem = async (ctx: Context) => {
  const body = await ctx.request.body().value;
  const newItem: Item = {
    id: v4.generate(),
    name: body.name,
    description: body.description,
  };
  items.push(newItem);
  ctx.response.status = 201;
  ctx.response.body = newItem;
};

// UPDATE item
export const updateItem = async (ctx: Context) => {
  const item = items.find((i: Item) => i.id === ctx.params.id);
  if (!item) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Item not found" };
    return;
  }

  const body = await ctx.request.body().value;
  item.name = body.name || item.name;
  item.description = body.description || item.description;
  ctx.response.body = item;
};

// DELETE item
export const deleteItem = (ctx: Context) => {
  const index = items.findIndex((i: Item) => i.id === ctx.params.id);
  if (index === -1) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Item not found" };
    return;
  }

  items.splice(index, 1);
  ctx.response.status = 204;
};