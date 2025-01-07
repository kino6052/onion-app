export { isArray, cloneDeep, assign, merge } from "lodash";

export const uniqueId = () => {
  return new Date().getTime().toString();
};
