/**
 * @description This function takes an object and converts it into
 * an SQL placeholder map, assuming the placeholders are named as the
 * properties in the initial object. i.e if obj = { myPropName: 42 },
 * this function returns { ":myPropName": 42 }.
 */
export function translateObjToSqlPlacehoderMap(obj: Object): Object {
  return Object.getOwnPropertyNames(obj).reduce((acc, prop) => {
    const placeholderName = `:${prop}`;
    return {
      ...acc,
      [placeholderName]: obj[prop as keyof Object],
    };
  }, {});
}
