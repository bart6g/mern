const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const Sensor = require("../models/Sensor");
const JWT_SECRET = `*LZ#uu]C{Z'RTAty<)gb9N[ch)V*t8{F=!afk.(=z#KnTQ:Aq%`;

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    !displayName ? (displayName = email) : displayName;

    //validation
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        displayName,
        email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      res.json(savedUser);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    //check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with following email exists" });
    }

    //check if password matches hashedPassword
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add/sensor", auth, async (req, res) => {
  try {
    const { userId, name, value } = req.body;
    if (!name || !value) {
      return res.json({ msg: "Not all fields are entered" });
    }
    const newSensor = new Sensor({
      userId,
      name,
      value,
    });
    const savedSensor = await newSensor.save();
    res.json(savedSensor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  const sensors = await Sensor.find({ user: user._id });
  res.json({
    displayName: user.displayName,
    id: user._id,
    sensors,
  });
});

module.exports = router;
