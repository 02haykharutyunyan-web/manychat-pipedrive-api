const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/manychat-to-pipedrive", async (req, res) => {
  try {
    const manychatData = req.body;
    const pipedriveApiKey = process.env.PIPEDRIVE_API_KEY;

    const response = await axios.post(
      `https://api.pipedrive.com/v1/deals?api_token=${pipedriveApiKey}`,
      {
        title: manychatData.name,
        value: manychatData.value,
      }
    );

    res.json({ success: true, pipedrive: response.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
