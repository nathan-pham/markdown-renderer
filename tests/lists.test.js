import Markdown from "../Markdown.js";

const orderedList = `
1. Eat goldfish
2. Re-stock fridge
3. Eat goldfish (again)
`;

const unorderedList = orderedList
    .split("\n")
    .map((line) => line.substring(3))
    .join("\n");

{
    /* <li></li> */
}

const listItems = `<li>Eat goldfish</li><li>Re-stock fridge</li><li>Eat goldfish (again)</li>`;
const renderedOrderedList = `<ol>${listItems}</ol>`;
const renderedUnorderdList = `<ul>${listItems}</ul>`;

test("rendering ordered lists", () => {
    expect(new Markdown(orderedList).render()).toBe(renderedOrderedList);
});

test("rendering ordered lists with content after", () => {
    expect(new Markdown(`${orderedList}\nHello World`).render()).toBe(
        `${renderedOrderedList}<p>Hello World</p>`
    );
});

test("rendering unordered lists", () => {
    expect(new Markdown(unorderedList).render()).toBe(renderedUnorderdList);
});

test("rendering unordered lists with content after", () => {
    expect(new Markdown(`${unorderedList}\nHello World`).render()).toBe(
        `${renderedUnorderdList}<p>Hello World</p>`
    );
});
