import Head from "next/head";
import Image from "next/image";
import HomeCategories from "../components/HomeCategories";
import HomeIngredients from "../components/HomeIngredients";
import HomeMeals from "../components/HomeMeals";
import SearchBox from "../components/SearchBox";

export async function getServerSideProps(context) {
  const mealsData = [];
  var i = 0;

  do {
    const res1 = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await res1.json();

    const found = mealsData.some(el => el.meals[0].mealId === data.meals[0].idMeal);    
    if (!found) {
      mealsData.push(data);
      i++;
    }
  } while (i < 10)

  const res2 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  );
  const categories = await res2.json();

  const res3 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const ingredients = await res3.json();

  return { props: { mealsData, categories, ingredients } };
}

export default function Home({ mealsData, categories, ingredients }) {
  return (
    <>
      <Head>
        <title>Next Recipes App</title>
      </Head>
      <div className="home">
        <div className="container">
          <SearchBox />
          <HomeMeals data={mealsData} />
          <HomeCategories data={categories}/>
          <HomeIngredients data={ingredients}/>
        </div>
      </div>
    </>
  );
}
