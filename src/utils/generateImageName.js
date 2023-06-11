const { getNanoid } = require("./getNanoid");

export const generateImageName = (str) => {
  return getNanoid(20) + str.substr(str.lastIndexOf("."));
};
