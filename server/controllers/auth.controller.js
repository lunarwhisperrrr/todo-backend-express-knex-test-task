const knex = require("../database/connection.js");
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');
const { addErrorReporting } = require("../utils/error");
const { JWT_SECRET } = require("../config.js");

exports.register = addErrorReporting(async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await knex("users").where({ email }).first();
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await knex("users").insert({
    username,
    email,
    password_hash: hashedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return res
    .status(201)
    .json({ message: "User registered successfully", userId: newUser[0] });
}, "Internal server error");

exports.login = addErrorReporting(async (req, res) => {
  const { email, password } = req.body;

  const user = await knex("users").where({ email }).first();
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({ message: "Login successful", token });
}, "Internal server error");
