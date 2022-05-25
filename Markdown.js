// created with shit-driven development:
// keep adding features and loops until it works!
export default class Markdown {
    constructor(input) {
        this.currentIndex = 0;
        this.metadata = {};

        this.lines = Markdown.preprocess(input);
        this.tokens = this.tokenize();

        console.log(this.tokens);
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
            const result = this.parseLine(this.currentLine);
            if (result) {
                tokens.push(result);
            }

            this.currentIndex++;
        }

        return tokens;
    }

    createToken(type, content, props = {}) {
        return {
            type,
            content: this.parseContent(content),
            ...props,
        };
    }

    // this really really really needs to be refactored
    parseContent(content) {
        let currentIndex = 0;
        let renderedContent = "";

        while (currentIndex < content.length) {
            const currentChar = content[currentIndex];
            let completePassFlag = false;
            let prevIndex = currentIndex;

            const failed = (char) => {
                if (content[currentIndex] !== char) {
                    renderedContent += content.substring(
                        prevIndex,
                        currentIndex + 1
                    );

                    completePassFlag = true;
                    return true;
                }

                return false;
            };

            // handle link
            handleLink: if (currentChar === "[") {
                let linkContent = "";
                let linkSrc = "";

                while (content[currentIndex + 1] !== "]") {
                    currentIndex++;
                    linkContent += content[currentIndex];
                }

                // skip over closing ]
                currentIndex += 2;

                // require the next character to be an opening ()
                if (failed("(")) {
                    break handleLink;
                }

                while (content[currentIndex + 1] !== ")") {
                    currentIndex++;
                    linkSrc += content[currentIndex];
                }

                currentIndex++; // skip over closing brace
                renderedContent += `<a href="${linkSrc}">${linkContent}</a>`;

                completePassFlag = true;
            }

            handleImage: if (currentChar === "!" && !completePassFlag) {
                let imageContent = "";
                let imageSrc = "";

                currentIndex++;
                if (failed("[")) {
                    break handleImage;
                }

                while (content[currentIndex + 1] !== "]") {
                    currentIndex++;
                    imageContent += content[currentIndex];
                }

                // skip over closing ]
                currentIndex += 2;

                if (failed("(")) {
                    break handleImage;
                }

                while (content[currentIndex + 1] !== ")") {
                    currentIndex++;
                    imageSrc += content[currentIndex];
                }

                currentIndex++; // skip over closing brace
                renderedContent += `<img src="${imageSrc}" alt="${imageContent}" />`;
                completePassFlag = true;
            }

            if (!completePassFlag) {
                renderedContent += currentChar;
            }

            currentIndex++;
        }

        return renderedContent;
    }

    parseLine(currentLine) {
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