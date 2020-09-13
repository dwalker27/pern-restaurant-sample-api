const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config(); //always remember .config()
const app = express();
const db = require('./db');

app.use(cors());
app.use(express.json()); //set a body on POST

app.get("/api/restaurants", async (req, res) => {
  try {

    const results = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows
      },
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get("/api/restaurants/:id", async (req, res) => {
  try {
    //use $1 for variable
    const restaurant = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1;", [req.params.id]); //wait for response, use parameterized queries
    const reviews = await db.query("select * from reviews WHERE restaurant_id = $1", [req.params.id]);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      },
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.post("/api/restaurants", async (req, res) => {
  try {
    //use $1 for variable
    const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *;",
      [req.body.name, req.body.location, req.body.price_range]); //wait for response, use parameterized queries

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      },
    });
  } catch (err) {
    res.status(500).json({ message: err });
  };
});

app.put("/api/restaurants/:id", async (req, res) => {
  try {
    //use $1 for variable
    const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *;",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]); //wait for response, use parameterized queries

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      },
    });
  } catch (err) {
    res.status(500).json({ message: err });
  };
})

app.delete("/api/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    //use $1 for variable
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]); //wait for response, use parameterized queries

    res.status(200).json({ //204 = No Content, but won't return ANYTHING
      status: "success"
    });
  } catch (err) {
    res.status(500).json({ message: err });
  };
});


app.post('/api/restaurants/:id/addReview', async (req, res) => {
  try {
    const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]);

    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0]
      }
    })
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening... port ${port}`);
});