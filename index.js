const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// BMI calculation API
app.post('/calculate-bmi', (req, res) => {
  const { weight, height } = req.body;

  if (!weight || !height || isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const roundedBmi = parseFloat(bmi.toFixed(1));

  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 24.9) category = 'Normal weight';
  else if (bmi < 29.9) category = 'Overweight';
  else category = 'Obesity';

  res.json({
    bmi: roundedBmi,
    category: category
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
