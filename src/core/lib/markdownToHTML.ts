/**
 * markdownToHTML - converts markdown to HTML.
 */

import { marked } from "marked";

export const markdownToHTML = async function(content: string) {
    return marked.parse(content);
};
