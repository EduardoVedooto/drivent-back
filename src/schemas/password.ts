import joi from "joi";

export default joi.object({
  password: joi.string().min(6).required(),
  confirmPassword: joi.ref("password")
});
