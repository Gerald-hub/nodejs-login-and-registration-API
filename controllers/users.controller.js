const bcryptjs = require("bcryptjs");
const userServices = require("../services/users.services");

exports.register = (req, res, next) => {
    const { password } = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userServices.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Your account was created successfully",
            data: result,
        });
    });
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;

    userServices.login({ username, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "You have logged in successfully",
            data: result,
        });
    });
};

exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: "Authorized Access"});
};