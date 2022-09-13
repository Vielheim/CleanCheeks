export const validate = (isValidated: boolean, message: string) => {
  if (!isValidated) {
    throw Error(message);
  }
};
