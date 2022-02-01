import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import HomeCategories from "../components/HomeCategories";
import HomeIngredients from "../components/HomeIngredients";
import HomeMeals from "../components/HomeMeals";
import SearchBox from "../components/SearchBox";
import AppContext from "../AppContext";
import FooterMenu from "../components/FooterMenu";
import {
  setCookies,
  getCookie,
  checkCookies,
  removeCookies,
} from "cookies-next";

export async function getServerSideProps({ req, res }) {
  //meals
  var mealsData = [];

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
  } while (i < 5);

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

  //getting 5 random ingredients
  let randomIngredients = ingredients.meals.slice(0, 5);

  return { props: { mealsData, randomIngredients } };
}

export default function Home({ mealsData, randomIngredients }) {
  const { categoriesData } = useContext(AppContext);
  const { ingredientsData } = useContext(AppContext);

  console.log(categoriesData);
  console.log(ingredientsData);

  return (
    <>
      <Head>
        <title>Next Recipes App</title>
      </Head>
      <div className="home">
        <SearchBox />
        <HomeMeals data={mealsData} />
        <HomeCategories data={categoriesData} />
        <HomeIngredients data={ingredientsData} />
      </div>
      <FooterMenu />
    </>
  );
}
