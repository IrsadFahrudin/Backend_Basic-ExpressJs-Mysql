
// untuk custom format pada response
const response = (statusCode, data, message, res) => {
    res.status(statusCode).json([
        {
            data,
            message,
            metadata: {
                prev: "",
                next: "",
                current: ""
            }
        }
    ])
}

module.exports = response;