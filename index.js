const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
