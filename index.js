import Markdown from "./Markdown.js";
import * as fs from "fs";

const markdown = new Markdown(fs.readFileSync("./replit-post.md", "utf-8"));
console.log(markdown.render());
