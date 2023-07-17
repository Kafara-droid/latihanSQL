const express = require('express');
const cors = require('cors');
const query = require('./query');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Define routes
app.get('/count-by-special-features', async (req, res) => {
  try {
    let data = await query.getCountBySpecialFeatures();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/count-by-rating', async (req, res) => {
  try {
    let data = await query.getCountByRating();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/top-customers', async (req, res) => {
  try {
    let data = await query.getTopCustomers();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/actor-count', async (req, res) => {
  try {
    let data = await query.getTopFilmsByActorCount();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/film-category', async (req, res) => {
  try {
    let data = await query.getFilmCategoryPercentage();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/customers-payment', async (req, res) => {
  try {
    let data = await query.getTopCustomersByPayment();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/count-by-language', async (req, res) => {
  try {
    let data = await query.getFilmCountByLanguage();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/daily-revenue', async (req, res) => {
  try {
    let data = await query.getDailyIncome();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/count-by-monthly-category', async (req, res) => {
  try {
    let data = await query.getRentalCountByMonthAndCategory();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/top-longest-rental', async (req, res) => {
  try {
    let data = await query.getTopFilmsByRentalDuration();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
