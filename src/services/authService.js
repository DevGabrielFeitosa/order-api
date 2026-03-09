const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET = "mysecret";

// Gera o token de acesso do usuário.
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

// Compara a senha informada com o hash salvo.
exports.comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};