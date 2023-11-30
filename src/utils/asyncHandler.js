const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error({
      status: error.code,
      message: error.message,
    });
  }
};
export { asyncHandler };
