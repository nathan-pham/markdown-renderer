![project banner](https://project-banner.phamn23.repl.co/?title=Markdown%20Renderer&description=vanilla%20Markdown%20parser%20and%20renderer&stack=node)

# Markdown Renderer

A vanilla Markdown parser and renderer. Needs heavy optimization and refactoring - use a different library instead. Currently supports images, links, lists, and code blocks.

## Example Usage

creating a new Markdown class

```js
import Markdown from "./Markdown.js";
import * as fs from "fs";

const markdown = new Markdown(fs.readFileSync("./hello-world.md", "utf-8"));

console.log(markdown.render());
```

rendered HTML:

```html
<h1>Hello World</h1>
<p>This is an example post in this amazing blogf</p>
<ul>
    <li>list one</li>
    <li>list two</li>
    <li>list three</li>
</ul>
<ol>
    <li>ordered list 2</li>
    <li>ordered list with a <a href="https://google.com">link</a></li>
</ol>
<p><img src="https://google.com" alt="and an image" /></p>
<h2>Lmao</h2>
<pre><code data-type="js">// this is an example code thingy that is very cool
let x = 10;
let y = x + 10;</code></pre>
```
