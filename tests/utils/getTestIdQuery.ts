/**
 * Generate a CSS selector string to select elements with
 * the provided "data-testid" attribute.
 *
 * @param {string} testId The test id to query
 * @returns {string} The generated css selector string
 */
const getTestIdQuery = (testId: string): string => `[data-testid="${testId}"]`;

export default getTestIdQuery;
