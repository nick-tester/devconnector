import { check } from "express-validator";

const userRegisterValidators = [
    check("name", "Name is required.").notEmpty(),
    check("email", "Email is required. Please enter a valid email.").notEmpty(),
    check("password", "Password must be 6 or more characters.").isLength({ min: 6 })
];

const userLoginValidators = [
    check("email", "Email is required. Please enter a valid email.").notEmpty(),
    check("password", "Password is required.").exists()
];

const profileCreateValidators = [
    check("status", "Status is required.").notEmpty(),
    check("skills", "Skills is required.").notEmpty()
];

const profileExperienceValidators = [
    check("title", "Title is required.").notEmpty(),
    check("company", "Company is required.").notEmpty(),
    check("from", "From date is required.").notEmpty()
];

const profileEducationValidators = [
    check("school", "School is required.").notEmpty(),
    check("level", "Level is required.").notEmpty(),
    check("fieldofstudy", "Field of study is required.").notEmpty(),
    check("from", "From date is required.").notEmpty()
];

export {
    userRegisterValidators,
    userLoginValidators,
    profileCreateValidators,
    profileExperienceValidators,
    profileEducationValidators
}