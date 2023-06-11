const { nanoid } = require("nanoid");

export const getNanoid = (random) => {
  return nanoid(random ? random : 10);
};
