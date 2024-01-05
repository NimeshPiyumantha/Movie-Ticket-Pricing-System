const _nameRegExp = /^[a-zA-Z ]+$/;
const _addressRegExp = /^[a-zA-Z0-9 ]+$/;
const _telNoRegExp = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;
const _emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const _passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

export const validateInputUser = (
  input: string,
  type: "name" | "address" | "mobileNumber" | "email" | "password",
): string | null => {
  switch (type) {
    case "name":
      if (input.trim() === "") {
        return "Name cannot be empty";
      } else if (input.trim().length > 50) {
        return "Name cannot be longer than 50 characters";
      } else if (!_nameRegExp.test(input)) {
        return "Name can only contain letters and spaces";
      }
      break;

    case "address":
      if (!_addressRegExp.test(input)) {
        return "Address can only contain letters, numbers, and spaces";
      }
      break;

    case "mobileNumber":
      if (!_telNoRegExp.test(input)) {
        return "Invalid mobile number";
      }
      break;

    case "email":
      if (!_emailRegExp.test(input)) {
        return "Invalid email";
      }
      break;

    case "password":
      if (!_passwordRegExp.test(input)) {
        return "Invalid password";
      }
      break;

    default:
      return "Invalid input type";
  }

  return null;
};

export const validateNameInput = (name: string) => {
  return _nameRegExp.test(name);
};

export const validateAddressInput = (address: string) => {
  return _addressRegExp.test(address);
};

export const validateMobileInput = (mobile: string) => {
  return _telNoRegExp.test(mobile);
};

export const validateEmailInput = (email: string) => {
  return _emailRegExp.test(email);
};

export const validatePasswordInput = (password: string) => {
  return _passwordRegExp.test(password);
};

export const maxDateUser = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = (date.getFullYear() - 21).toString();
  return `${year}-${month}-${day}`;
};

export const minDateUser = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = (date.getFullYear() - 50).toString();
  return `${year}-${month}-${day}`;
};
