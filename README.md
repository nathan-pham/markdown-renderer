![project banner](https://project-banner.phamn23.repl.co/?title=Markdown%20Renderer&description=vanilla%20Markdown%20parser%20and%20renderer&stack=node)

# Markdown Renderer

A vanilla Markdown renderer created for the Replit Template Jam. Although it needs heavy optimization and refactoring, it does not use a line of regex and therefore makes me feel like a real programmer. Currently supports images, links, lists, blockquotes, inline code, and code blocks.

## Example Usage

creating a new Markdown class

```js
import Markdown from "./Markdown.js";
import * as fs from "fs";

const markdown = new Markdown(fs.readFileSync("./replit-post.md", "utf-8"));
console.log(markdown.render());
```

rendered HTML (formatted for readability):

```html
<h1>Hello World</h1>
<p>
    This blog was created for the
    <a href="https://blog.replit.com/template-jam">Replit Template Jam</a>.
</p>
<p>
    This is the first post in my new blog! Take a look around. Everything you
    see (both frontend and backend) is built with vanilla JavaScript. No
    frameworks or libraries at all. Although my code is pretty crap and is
    likely not as performant and tested as other maintained frameworks and
    repositories, it's important to recognize the value of responsible and
    good-old fashioned code.
</p>
<h2>Replit Features</h2>
<p>
    Ok obviously we didn't use <i>zero</i> libraries or frameworks. We used some
    cool Replit features!
</p>
<ul>
    <li>Replit Database for comments</li>
    <li>Replit Auth for comments</li>
</ul>
<h2>Project Timeline</h2>
<p>Here are some important milestones in this project:</p>
<ol>
    <li>Day 1: new Replit project to serve static resources</li>
    <li>
        Day 2 - 3: created a
        <a href="https://github.com/nathan-pham/markdown-renderer"
            >Markdown renderer</a
        >
        from scratch
    </li>
    <li>Day 4:</li>
</ol>
```
