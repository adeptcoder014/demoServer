const express = require("express");
const router = express.Router();

const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/user");


const signupRoute = router.use("/auth", signupRoutes);
const loginRoute = router.use("/auth", loginRoutes);
const userRoute = router.use("/user", userRoutes);



module.exports = signupRoute,loginRoute,userRoute
