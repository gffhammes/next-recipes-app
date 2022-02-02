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
    } while (i < 5);

    nookies.set(ctx, "RANDOM_MEALS", JSON.stringify(mealsData), {
      maxAge: 5 * 60,
      path: "/",
    });
  } else {
    mealsData = JSON.parse(mealsCookies);
  }

  //--meals
  // var i = 0;

  // do {
  //   const res1 = await fetch(
  //     `https://www.themealdb.com/api/json/v1/1/random.php`
  //   );
  //   const data = await res1.json();

  //   const found = mealsData.some(
  //     (el) => el.meals[0].mealId === data.meals[0].idMeal
  //   );
  //   if (!found) {
  //     mealsData.push(data);
  //     i++;
  //   }
  // } while (i < 5);

  // const strMeals = JSON.stringify(mealsData);

  // console.log(strMeals);

  // console.log(typeof strMeals);

  // nookies.set(ctx, "RANDOM_MEALS", strMeals, {
  //   maxAge: 5 * 60,
  //   path: "/",
  // });

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
