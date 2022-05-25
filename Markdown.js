export default class Markdown {
    constructor(input) {
        this.currentIndex = 0;
        this.metadata = {};

        this.lines = Markdown.preprocess(input);
        this.tokens = this.tokenize();

        console.log();
        console.log();
        console.log();

        console.log(this.tokens, "tokens");
        console.log(this.metadata, "metadata");
    }

    static preprocess(input, delimiter = "\n") {
        return input
            .split(delimiter)
            .map((t) => t.trim())
            .filter((t) => t.length);
    }

    get currentLine() {
        return this.lines[this.currentIndex];
    }

    nextLine() {
        this.currentIndex++;
        return this.lines[this.currentIndex];
    }

    peekLine() {
        return this.lines[this.currentIndex + 1];
    }

    tokenize() {
        const tokens = [];
        while (this.currentIndex < this.lines.length) {
            const result = this.parse(this.currentLine);
            if (result) {
                tokens.push(result);
            }

            this.currentIndex++;
        }

        return tokens;
    }

    createToken(type, content) {
        return {
            type,
            content: this.parseContent(content),
        };
    }

    parseContent(content) {
        const words = Markdown.preprocess(content, " ");
        const tokens = [];

        let currentIndex = 0;

        while (currentIndex < words.length) {
            tokens.push(words[currentIndex]);
            currentIndex++;
        }

        return tokens;
    }

    parse(currentLine) {
        // handle metadata
        if (currentLine === "---") {
            while (this.peekLine() !== "---" && this.peekLine()) {
                const [key, ...values] = this.nextLine().split(":");
                this.metadata[key.trim()] = values.join(" ").trim();
            }

            // skip over ending ---
            this.nextLine();
            return null;
        }

        // headings
        else if (currentLine.startsWith("#")) {
            const heading = currentLine.split(" ").shift();
            const size = heading.length;

            // ensure space is between # and content
            if (
                heading.split("").filter((char) => char === "#").length == size
            ) {
                return this.createToken(
                    `h${size}`,
                    currentLine.substring(size).trimStart()
                );
            } else {
                return this.createToken("p", currentLine);
            }
        }

        // unordered list
        else if (currentLine.startsWith("- ")) {
            return this.createToken("li", currentLine.substring(1).trimStart());
        }

        // ordered list
        else if (Number.isInteger(parseInt(currentLine.split(".").shift()))) {
            const number = currentLine.split(".").shift();

            return this.createToken(
                "ol",
                currentLine.substring(number.length + 1).trimStart()
            );
        }

        return this.createToken("p", currentLine);
    }

    render() {}
}
