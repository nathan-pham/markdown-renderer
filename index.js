import Markdown from "./Markdown.js";
import * as fs from "fs";

const markdown = new Markdown(fs.readFileSync("./hello-world.md", "utf-8"));

console.log(markdown.render());
