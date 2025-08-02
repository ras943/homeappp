const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Replace this with your actual User model path
const User = require("./models_Job");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/home-services", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Define findBestProvider directly
async function findBestProvider(job) {
  const providers = await User.find({
    role: "provider",
    services: job.category,
    isAvailable: true,
    pushToken: { $exists: true },
  });

  // Replace this with your own AI logic if needed
  if (!providers || providers.length === 0) {
    return null;
  }

  // Simple placeholder: return the first available provider
  return providers[0];
}

// 🎯 Example endpoint that uses findBestProvider
app.post("/dispatch", async (req, res) => {
  const job = req.body;

  try {
    const provider = await findBestProvider(job);

    if (!provider) {
      return res.status(404).json({ message: "No suitable provider found." });
    }

    // Dispatch logic could go here (e.g., push notification, database entry)
    return res.status(200).json({ provider });
  } catch (err) {
    console.error("Error dispatching provider:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`AI Dispatch Backend is running on port ${PORT}`);
});

app.get('/', (req, res) => res.send('AI Dispatch Backend is running!'));
