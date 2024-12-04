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
