/**
 * Get the value of a URL parameter
 *
 * @param {string | string[]} param Parameter value pulled from url
 * @returns {string} The pure Parameter string value
 */
const getUrlParam = (param: string | string[]): string =>
	typeof param === "string" ? param : param[0];

export default getUrlParam;
