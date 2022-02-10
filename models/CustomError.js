class CustomError {
    statusCode
    message
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    sendByEmail() {
        console.log("send notification by email");
    }
    sendBySlack() {
        console.log("send by slack");
    }
}
export default CustomError