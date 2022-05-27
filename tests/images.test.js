import Markdown from "../Markdown.js";

const altContent = "Twitter Profile Picture";
const src =
    "https://pbs.twimg.com/profile_images/1520125126271922179/ds8zJhJV_400x400.jpg";

const markdown = `![${altContent}](${src})`;
const rendered = `<img src="${src}" alt="${altContent}" />`;

test("rendering image", () => {
    expect(new Markdown().parseContent(markdown)).toBe(rendered);
    expect(new Markdown(markdown).render()).toBe(`<p>${rendered}</p>`);
});

test("rendering image with content before", () => {
    expect(new Markdown().parseContent(`hello world ${markdown}`)).toBe(
        `hello world ${rendered}`
    );
});

test("rendering image with content after", () => {
    expect(new Markdown().parseContent(`${markdown} hello world`)).toBe(
        `${rendered} hello world`
    );
});
