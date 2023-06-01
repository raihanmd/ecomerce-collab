import passwordValidator from "password-validator";
const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8, "The password should have a minimum length of 8 characters")
  .is()
  .max(50, "The password should have a maximum length of 50 characters")
  .has()
  .uppercase(1, "The password should have a minimum of 1 uppercase letter")
  .has()
  .lowercase(1, "The password should have a minimum of 1 lowercase letter")
  .has()
  .digits(1, "The password should have a minimum of 1 digits number")
  .has()
  .not()
  .spaces(0, "The password should not have spaces");

export const getErrMessage = (password) => {
  return passwordSchema.validate(password, { details: true });
};

export const passwordIsValid = (password) => {
  return passwordSchema.validate(password);
};
