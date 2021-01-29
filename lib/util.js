"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.underscore = exports.camelCase = exports.hyphenate = exports.filterProperties = exports.mapProperties = exports.distinct = exports.flatten = exports.objectFromEntries = void 0;
function objectFromEntries(entries) {
    const result = {};
    entries.forEach(([key, value]) => result[key] = value);
    return result;
}
exports.objectFromEntries = objectFromEntries;
const flatten = (result, el) => [...result, ...el];
exports.flatten = flatten;
const distinct = (el, index, array) => array.indexOf(el) === index;
exports.distinct = distinct;
function mapProperties(object, mapper) {
    const result = {};
    for (const key in object) {
        result[key] = mapper(object[key], key);
    }
    return result;
}
exports.mapProperties = mapProperties;
function filterProperties(object, predicate) {
    return objectFromEntries(Object.entries(object).filter(([k, v]) => predicate(v, k)));
}
exports.filterProperties = filterProperties;
const hyphenate = (value) => (value
    .replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
    .replace(/_/g, '-'));
exports.hyphenate = hyphenate;
const camelCase = (value) => (value
    .replace(/^[A-Z]/, g => g.toLowerCase())
    .replace(/[-_][a-z]/g, g => g[1].toUpperCase()));
exports.camelCase = camelCase;
const underscore = (value) => (value
    .replace(/([A-Z])/g, g => `_${g[0].toLowerCase()}`)
    .replace(/-/g, '_'));
exports.underscore = underscore;
