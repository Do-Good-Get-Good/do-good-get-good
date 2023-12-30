class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "UnauthenticatedError";
  }
}

class NotPermittedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "NotPermittedError";
  }
}

class InvalidRoleError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "InvalidRoleError";
  }
}

module.exports = {
  UnauthenticatedError,
  NotPermittedError,
  InvalidRoleError,
};
