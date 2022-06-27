class AppError extends Error {
  private statusCode
  private status
  private isOperational
  constructor(message: any, statusCode: any) {

    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
}

module.exports = AppError;