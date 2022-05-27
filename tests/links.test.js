import Markdown from "../Markdown.js";

const textContent = "google link";
const href = "https://google.com";

const markdown = `[${textContent}](${href})`; // [google link](https://google.com)
const rendered = `<a href="${href}">${textContent}</a>`; // <a href="https://google.com">google link</a>

test("rendering links", () => {
    // link by itself
    expect(new Markdown().parseContent(markdown)).toBe(rendered);
    expect(new Markdown(markdown).render()).toBe(`<p>${rendered}</p>`);
});

test("rendering links with content before", () => {
    expect(new Markdown().parseContent(`hello world ${markdown}`)).toBe(
        `hello world ${rendered}`
    );
});

test("rendering links with content after", () => {
    expect(new Markdown().parseContent(`${markdown} hello world`)).toBe(
        `${rendered} hello world`
    );
});

test("rendering broken links", () => {
    expect(new Markdown().parseContent(`[broken(https://google.com)`)).toBe(
        "[broken(https://google.com)"
    );

    expect(new Markdown().parseContent(`[broken(https://google.com`)).toBe(
        "[broken(https://google.com"
    );
});
