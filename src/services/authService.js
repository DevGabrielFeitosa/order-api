const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET = "mysecret";

exports.generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        SECRET,
        { expiresIn: "5m" }
    );
};

exports.comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};