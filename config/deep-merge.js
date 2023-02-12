function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(target, source) {
  if (target === undefined) {
    return source;
  }

  if (isObject(target)) {
    if (source === undefined) {
      return target;
    }

    if (isObject(source)) {
      // recursively merge set(targetprops, sourceprops)
      // return result
    }
  }

  // Yeah, this will replace an object with a primitive value or an array (or
  // vice versa), but I don't expect that situation will arise unless I've made
  // a mistake (or it's what I want), anyway.
  return source;
}

module.exports = deepMerge;
