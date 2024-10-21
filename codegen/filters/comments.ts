/**
 * Block commenter filter.
 *
 * This filter will ensure each line starts with * in a block comment. Assumes
 * the template includes * on first line.
 */
export function blockComment(content: any) {
  // Ensure the content is a string
  let str = typeof content === "string" ? content : String(content);

  str = str
    .split("\n")
    .reduceRight<string[]>((accumulator, value) => {
      // Removing tailing empty lines
      if (accumulator.length === 0 && value.trim() === "") {
        return accumulator;
      }
      accumulator.unshift(value);
      return accumulator;
    }, [])
    .map((line, index) => {
      let value: string;
      if (line.replace(/^\s+$/gm, "")) {
        value = " " + line.replace(/\t/g, "  ");
      } else {
        // Render empty lines
        value = "";
      }
      if (index > 0) {
        // Add '*' to the beginning of subsequent lines
        return " *" + value;
      }
      return value.trimStart(); // First line should have no leading spaces
    })
    .join("\n")
    .trimEnd();

  // Capitalize first sentence.
  return str.charAt(0).toUpperCase() + str.slice(1);
}
