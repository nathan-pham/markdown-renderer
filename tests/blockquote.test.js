import Markdown from "../Markdown.js";

test("rendering a multiline quote", () => {
    const blockquote = `> A wise man once said eat cheezit
> but in reality you should eat a goldfish
> lol`;

    expect(new Markdown(blockquote).render()).toBe(
        `<blockquote>A wise man once said eat cheezit<br />but in reality you should eat a goldfish<br />lol</blockquote>`
    );
});

test("rendering a single line quote", () => {
    expect(new Markdown("> A wise man once said eat goldfish").render()).toBe(
        "<blockquote>A wise man once said eat goldfish</blockquote>"
    );
});
