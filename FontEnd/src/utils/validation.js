import isEmail from "validator/lib/isEmail";
import { REGISTER_FIELDS } from "./constants";
import { isInt } from "validator";

// export interface IInputValidator {
//   (v1: string, v2?: string): { result: boolean; message: string };
// }

const validateDefaultString = function (v) {
  if (v.length === 0) return { result: false, message: "required" };
  if (!/\w{3,35}/.test(v))
    return { result: false, message: "length 3-35 chars" };
  return { result: true, message: "valid" };
};

export const isEmpty = function (str) {
  if (str.length === 0) return { result: false, message: "required" };
  return { result: true, message: "valid" };
};

export const isIDValid = function (IDcard) {
  if (IDcard.length === 0) return { result: false, message: "required" };
  if (!/\d{9}/.test(IDcard))
    return { result: false, message: "insert a valid israeli ID number" };
  return { result: true, message: "valid" };
};

export const isPasswordValid = function (password) {
  if (password.length === 0) return { result: false, message: "required" };
  // const result =
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,12}$/.test(
  //     password
  //   );
  // if (!result) return { result: false, message: "invalid" };
  return { result: true, message: "valid" };
};

export const isPasswordConfirmValid = function (password, passwordConfirm) {
  if (passwordConfirm?.length === 0)
    return { result: false, message: "required" };
  const result =
    isPasswordValid(passwordConfirm).result && password === passwordConfirm;
  if (!result) return { result: false, message: "passwords do not match" };
  return { result: true, message: "valid" };
};

export const isFirstNameValid = function (firstName) {
  return validateDefaultString(firstName);
};

export const isLastNameValid = function (lastName) {
  return validateDefaultString(lastName);
};

export const isEmailValid = function (email) {
  // return /[\w.*-]+@([\w-]+\.)+[\w-]{2,4}/.test(email);
  if (email.length === 0) return { result: false, message: "required" };
  const result = isEmail(email);
  if (!result) return { result: false, message: "invalid" };
  return { result: true, message: "valid" };
};

export const isMobileValid = function (mobile) {
  if (mobile.length === 0) return { result: false, message: "required" };
  const result = /05\d{8}/.test(mobile);
  if (!result)
    return { result: false, message: "insert a valid israeli mobile number" };
  return { result: true, message: "valid" };
};

export const isAddressValid = function (address) {
  return validateDefaultString(address);
};

export function validateAllFields(fields) {
  const results = REGISTER_FIELDS.filter((f) => fields[f.id] !== undefined).map(
    (f) => {
      const validator =
        f.id === "passwordConfirm"
          ? (value) => f.validator(fields.password || "", value)
          : f.validator;
      return {
        name: f.id,
        value: fields[f.id],
        ...validator(fields[f.id]),
      };
    }
  );
  const data = results
    .filter((r) => !r.result)
    .map((r) => {
      return { name: r.name, value: r.value, message: r.message };
    });
  const msg = data.length === 0 ? "" : "Invalid inputs";
  return { msg, data };
}

export function validateLoginFields(fields) {
  const missedFields = Object.keys(fields).filter((k) => fields[k] === "");
  if (missedFields.length > 0) {
    return {
      msg: "Invalid inputs",
      data: missedFields.map((k) => {
        return { name: k, value: "", message: "required" };
      }),
    };
  }
  return { msg: "", data: [] };
}

export function validateForm(fields) {
  const fieldsKeys = Object.keys(fields);
  if (
    fieldsKeys.length === 2 &&
    fieldsKeys[0] === "IDcard" &&
    fieldsKeys[1] === "password"
  ) {
    return validateLoginFields(fields);
  }
  // if ()
  return validateAllFields(fields);
}
