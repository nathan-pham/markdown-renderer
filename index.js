import Markdown from "./src/Markdown.js";
import * as fs from "fs";

const markdown = new Markdown(fs.readFileSync("./hello-world.md", "utf-8"));
