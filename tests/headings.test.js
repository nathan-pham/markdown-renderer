import Markdown from "../Markdown.js";

const textContent = "Hello World";

// probably shouldn't be writing logic in tests
// creates an array that looks like ["# Hello World", "## Hello World" ...]
const markdown = new Array(5)
    .fill(0)
    .map((_, i) => `${"#".repeat(i + 1)} ${textContent}`);

// creates an array that looks like ["<h1>Hello World</h1>", "<h2>Hello World</h2>"]
const rendered = new Array(5).fill(0).map((_, i) => {
    const tag = `h${i + 1}`;
    return `<${tag}>${textContent}</${tag}>`;
});

// tests
test("rendering headings", () => {
    for (let i = 0; i < markdown.length; i++) {
        expect(new Markdown(markdown[i]).render()).toBe(rendered[i]);
    }
});

test("rendering headings with content before", () => {
    for (let i = 0; i < markdown.length; i++) {
        const contentBefore = `hello world ${markdown[i]}`;
        expect(new Markdown(contentBefore).render()).toBe(
            `<p>${contentBefore}</p>`
        );
    }
});
