import Markdown from "./Markdown.js";
import * as fs from "fs";

new Markdown(fs.readFileSync("./hello-world.md", "utf-8"));
