class BusinessError extends Error {
  msg: string;
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.msg = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BusinessError;
