import Head from "next/head";
import Image from "next/image";
import HomeCategories from "../components/HomeCategories";
import HomeIngredients from "../components/HomeIngredients";
import HomeMeals from "../components/HomeMeals";
import SearchBox from "../components/SearchBox";

export async function getServerSideProps(context) {
  //meals
  const mealsData = [];
  var i = 0;

  do {
    const res1 = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await res1.json();

    const found = mealsData.some(
      (el) => el.meals[0].mealId === data.meals[0].idMeal
    );
    if (!found) {
      mealsData.push(data);
      i++;
    }
  } while (i < 10);

  //categories
  const res2 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  );
  const categories = await res2.json();

  //getting all ingredients
  const res3 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const ingredients = await res3.json();

  //getting 20 random ingredients
  const shuffled = ingredients.meals.sort(() => 0.5 - Math.random());
  let randomIngredients = shuffled.slice(0, 20);

  //getting the amount of recipes of each ingredient
  const promises = randomIngredients.map(async (ingredient) => {
    const ingredient_name = ingredient.strIngredient
      .replaceAll(" ", "_")
      .toLowerCase();

    ingredient.ingredient_name = ingredient_name;

    const res4 = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient_name}`
    );
    const recipes = await res4.json();

    ingredient.recipes = recipes;
  });

  const ingredientsTest = await Promise.all(promises);

/*
  randomIngredients.map((ingredient) => {
    const ingredient_name = ingredient.strIngredient
      .replaceAll(" ", "_")
      .toLowerCase();

    ingredient.ingredient_name = ingredient_name;

    const res4 = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient_name}`
    );
    const recipes = await res4.json();

    ingredient.recipes = recipes;
  });*/

  /*for (i = 0; i < 20; i++) {
    const res4 = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`
    );
    const ingredients = await res4.json();
  }*/

  return { props: { mealsData, categories, randomIngredients } };
}

export default function Home({ mealsData, categories, randomIngredients }) {
  return (
    <>
      <Head>
        <title>Next Recipes App</title>
      </Head>
      <div className="home">
        <SearchBox />
        <HomeMeals data={mealsData} />
        <HomeCategories data={categories} />
        <HomeIngredients data={randomIngredients} />
      </div>
    </>
  );
}
