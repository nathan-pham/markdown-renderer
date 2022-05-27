import Markdown from "../Markdown.js";

test("rendering code blocks", () => {
    const codeblock = `\`\`\`js
let x = 10;
x++;
\`\`\``;

    const renderedCodeblock = `<pre><code data-type="js">let x = 10;\nx++;</code></pre>`;
    expect(new Markdown(codeblock).render()).toBe(renderedCodeblock);
});

test("rendering code blocks without language", () => {
    const codeblock = `\`\`\`
let x = 10;
x++;
\`\`\``;

    const renderedCodeblock = `<pre><code>let x = 10;\nx++;</code></pre>`;
    expect(new Markdown(codeblock).render()).toBe(renderedCodeblock);
});
