const validateId = (valueId) => {
  if (/^[0-9a-fA-F]{24}$/.test(valueId)) {
    return true;
  }
};
export { validateId };
