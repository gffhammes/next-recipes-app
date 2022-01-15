import Head from "next/head";
import Image from "next/image";
import HomeCategories from "../components/HomeCategories";
import HomeMeals from "../components/HomeMeals";
import SearchBox from "../components/SearchBox";

export async function getServerSideProps(context) {
  const mealsData = [];
  var i = 0;

  do {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await res.json();

    const found = mealsData.some(el => el.meals[0].mealId === data.meals[0].idMeal);    
    if (!found) {
      mealsData.push(data);
      i++;
    }
  } while (i < 10)

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  );
  const categories = await res.json();

  return { props: { mealsData, categories } };
}

export default function Home({ mealsData, categories }) {
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
        </div>
      </div>
    </>
  );
}
