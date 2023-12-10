const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(err.code || 500).json({
      status: error.code,
      message: error.message,
    });
  }
};
export { asyncHandler };

/*
const asyncHandler = (requestHandler) => {
  async (req, res, next) => {
    await Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};
*/
