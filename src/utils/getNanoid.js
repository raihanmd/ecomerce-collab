const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 10);

export const getNanoid = () => {
  return nanoid();
};
