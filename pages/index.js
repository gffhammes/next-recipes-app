import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect } from "react";
import HomeCategories from "../components/HomeCategories";
import HomeIngredients from "../components/HomeIngredients";
import HomeMeals from "../components/HomeMeals";
import SearchBox from "../components/SearchBox";
import AppContext from "../AppContext";
import FooterMenu from "../components/FooterMenu";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  var mealsData = [];
  var i = 0;

  const mealsCookies = nookies.get(ctx).RANDOM_MEALS;

  if (!mealsCookies) {
    do {
      const resRandomMeal = await fetch(
        `https://www.themealdb.com/api/json/v1/1/random.php`
      );
      const randomMealData = await resRandomMeal.json();

      const found = mealsData.some(
        (el) => el.id === randomMealData.meals[0].idMeal
      );
      if (!found) {
        mealsData.push({
          id: randomMealData.meals[0].idMeal,
          name: randomMealData.meals[0].strMeal,
          thumb: randomMealData.meals[0].strMealThumb,
        });
        i++;
      }
    } while (i < 6);

    nookies.set(ctx, "RANDOM_MEALS", JSON.stringify(mealsData), {
      maxAge: 5 * 60,
      path: "/",
    });
  } else {
    mealsData = JSON.parse(mealsCookies);
  }

  return { props: { mealsData } };
}

export default function Home({ mealsData }) {
  const { categoriesData } = useContext(AppContext);
  const { ingredientsData } = useContext(AppContext);

  return (
    <>
      <Head>
        <title>Next Recipes App</title>
      </Head>
      <SearchBox />
      <div className="home">
        <HomeMeals data={mealsData} />
        <HomeCategories data={categoriesData} />
        <HomeIngredients data={ingredientsData} />
      </div>
      <FooterMenu />
    </>
  );
}
