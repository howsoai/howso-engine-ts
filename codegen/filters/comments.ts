/**
 * Block commenter filter.
 *
 * This filter will ensure each line starts with * in a block comment.
 */
export function blockComment(content: any) {
  // Ensure the content is a string
  const str = typeof content === "string" ? content : String(content);

  // Add '*' to the beginning of each line
  return str
    .split("\n")
    .map((line) => ` * ${line.trimStart()}`)
    .join("\n")
    .trimEnd();
}
