const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

app.post('/', async (req, res) => {
  try {
    const task = req.body;
    const suburb = task?.Location?.Suburb || task?.suburb || 'Unknown';
    const message = `Campbell Plumbing & Maintenance new job created in ${suburb}`;

    await axios.post(`https://graph.facebook.com/${PAGE_ID}/feed`, {
      message,
      access_token: ACCESS_TOKEN,
    });

    res.status(200).send('Facebook post successful');
  } catch (err) {
    console.error('Facebook post failed:', err.message);
    res.status(500).send('Facebook post failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook running on port ${PORT}`));
