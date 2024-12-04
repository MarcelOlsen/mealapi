import express from "express";
import { MealsDB } from "./mealsDB.js";

const PORT = 3002;
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const app = express();
const db = new MealsDB();

app.get("/meals/search/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const data = await response.json();

    res.json({ success: "ok", meals: data.meals });
  } catch (error) {
    console.error("Error while fetching data from MealDB API:", error);
    res
      .status(500)
      .json({ success: "error", message: "Failed to fetch meals." });
  }
});

app.get("/meals/random", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();

    console.log(response);

    res.json({ success: "ok", meal: data.meals });
  } catch (error) {
    console.error("Error while fetching data from MealDB API:", error);
    res
      .status(500)
      .json({ success: "error", message: "Failed to fetch random meal." });
  }
});

app.get("/meals/favorite", async (req, res) => {
  try {
    const meals = db.getMeals();

    const populatedMeals = [];
    for (let meal of meals) {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${meal}`);
      const data = await response.json();
      populatedMeals.push(data.meals[0]);
    }

    res.json({ success: "ok", favorites: populatedMeals });
  } catch (error) {
    console.error("Error while fetching favorite meals:", error);
    res
      .status(500)
      .json({ success: "error", message: "Failed to fetch favorite meals." });
  }
});

app.post("/meals/favorite/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await meal.json();

    db.addMeal(data.meals[0].idMeal);
    res.json({ success: "ok", message: "Meal added to favorites." });
  } catch (error) {
    console.error("Error while adding meal to favorites:", error);
    res
      .status(500)
      .json({ success: "error", message: "Failed to add meal to favorites." });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} 🚚`);
});
