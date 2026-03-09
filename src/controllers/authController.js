const jwt = require("jsonwebtoken");

const SECRET = "mysecret";

exports.login = async (req, res) => {

    const { username, password } = req.body;

    if (username !== "admin" || password !== "123456") {
        return res.status(401).json({
            message: "Credenciais inválidas"
        });
    }

    const token = jwt.sign(
        { username },
        SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
};