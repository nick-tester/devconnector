const { check } = require("express-validator");

const userRegisterValidators = [
    check("name", "Name is required.").notEmpty(),
    check("email", "Email is required. Please enter a valid email.").notEmpty(),
    check("password", "Password must be 6 or more characters.").isLength({ min: 6 })
];

module.exports = {
    userRegisterValidators
}