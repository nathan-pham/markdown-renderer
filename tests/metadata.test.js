import Markdown from "../Markdown.js";

const markdownFile = `
---
title: Hello World
description: This is my first post
---
`;

test("retrieving metadata", () => {
    expect(new Markdown(markdownFile).metadata).toEqual({
        title: "Hello World",
        description: "This is my first post",
    });
});

test("retrieving empty metadata", () => {
    expect(new Markdown("---").metadata).toEqual({});
    expect(new Markdown("---\n---").metadata).toEqual({});
});
