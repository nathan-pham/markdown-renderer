import Markdown from "../Markdown.js";

test("rendering paragraphs", () => {
    expect(new Markdown("Hello World").render()).toBe("<p>Hello World</p>");
});

test("rendering paragraphs with italics", () => {
    expect(new Markdown("Hello _World_").render()).toBe(
        "<p>Hello <i>World</i></p>"
    );

    expect(new Markdown("Hello _World_ Content After").render()).toBe(
        "<p>Hello <i>World</i> Content After</p>"
    );
});

test("rendering paragraphs with bold text", () => {
    // paragraph with bold
    expect(new Markdown("Hello **World**").render()).toBe(
        "<p>Hello <b>World</b></p>"
    );

    expect(new Markdown("Hello **World** Content After").render()).toBe(
        "<p>Hello <b>World</b> Content After</p>"
    );
});

test("rendering broken styles", () => {
    expect(new Markdown("Hello _World Content After").render()).toBe(
        "<p>Hello _World Content After</p>"
    );

    expect(new Markdown("Hello **World* Content After").render()).toBe(
        "<p>Hello **World* Content After</p>"
    );

    expect(new Markdown("Hello *World** Content After").render()).toBe(
        "<p>Hello *World** Content After</p>"
    );
});
