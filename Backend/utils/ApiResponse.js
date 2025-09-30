export class ApiResponse {
  constructor(res) {
    this.res = res;
  }

  success(message = "Success", payload = null, code = 200) {
    return this.res.status(code).json({
      status: "success",
      message,
      payload,
    });
  }

  error(message = "Error", code = 400, payload = null) {
    return this.res.status(code).json({
      status: "error",
      message,
      payload,
    });
  }
}
