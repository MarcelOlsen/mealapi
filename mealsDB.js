import fs from "fs";

export class MealsDB {
  constructor(filename = "meals.json") {
    this.filename = filename;
    this.meals = this.readMeals();
  }

  readMeals() {
    try {
      const data = fs.readFileSync(this.filename);
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  writeMeals() {
    fs.writeFileSync(this.filename, JSON.stringify(this.meals, null, 2));
  }

  addMeal(meal) {
    this.meals.push(meal);
    this.writeMeals();
  }

  getMeals() {
    return this.meals;
  }

  getMealById(id) {
    return this.meals.find((meal) => meal.id === id);
  }

  updateMeal(id, updatedMeal) {
    const index = this.meals.findIndex((meal) => meal.id === id);
    if (index !== -1) {
      this.meals[index] = { ...this.meals[index], ...updatedMeal };
      this.writeMeals();
      return true;
    }
    return false;
  }

  deleteMeal(id) {
    const index = this.meals.findIndex((meal) => meal.id === id);
    if (index !== -1) {
      this.meals.splice(index, 1);
      this.writeMeals();
      return true;
    }
    return false;
  }
}
