class AppError {
  constructor(message, statusCode = 400){
    this.message = message;
    this.statusCode = statusCode;
  }

  message;
  statusCode;
}

module.exports = AppError;
