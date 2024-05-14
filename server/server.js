const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const User = require("./Models/user");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer({
  storage: multer.memoryStorage(),
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Fsproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const storageClient = new Storage({
  keyFilename: "fractals-retailer-5a194bfecf26.json",
});

// Routes
app.post("/api/login", async (req, res) => {
  console.log("Received login request:", req.body);
  const { username, password } = req.body;
  try {
    console.log("Searching for user in the database...");
    const user = await User.findOne({ username, password });
    console.log("User found:", user);
    if (!user) {
      console.log("User not found. Sending error response...");
      return res.status(401).json({ message: "Invalid username or password" });
    }
    console.log("User authenticated. Sending role...");
    res.status(200).json({ user: user, role: user.role });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

app.post("/api/signup", async (req, res) => {
  console.log("Received signup request:", req.body);
  const { username, password, role } = req.body;
  try {
    if (!username || !password || !role) {
      return res.status(400).json({ message: "Please provide username, password, and role." });
    }

    if (role !== "manufacturer" && role !== "retailer") {
      return res.status(400).json({ message: 'Invalid role. Allowed roles are "manufacturer" and "retailer".' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists. Please choose a different username." });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();
    console.log("User created successfully:", newUser);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

app.post("/api/upload-files", upload.single("file"), (req, res) => {
  console.log(req);
  const file = req.file;
  const username = req.body.title;
  bucketName = "reatiler_uploadfile";
  console.log(username);

  if (!file) {
    return res.status(400).send("File is required.");
  }

  const fileName = `${Date.now()}_${file.originalname}`;
  const filePath = `uploads/${username}/${fileName}`; // optional: specify a folder in the bucket

  // Upload file to Google Cloud Storage
  const bucket = storageClient.bucket(bucketName);
  const blob = bucket.file(filePath);

  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype,
  });

  blobStream.on("error", (err) => {
    console.error(err);
    res.status(500).send("Failed to upload file.");
  });

  blobStream.on("finish", () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`;
    res.status(200).send(`File uploaded successfully. Public URL: ${publicUrl}`);
  });

  blobStream.end(file.buffer);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
