import Head from "next/head";
import Image from "next/image";
import HomeMeals from "../components/HomeMeals";
import SearchBox from "../components/SearchBox";

export async function getServerSideProps(context) {
  const mealsData = [];

  for (let i = 0; i < 10; i++) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    const data = await res.json();

    mealsData.push(data);
  }

  return { props: { mealsData } };
}

export default function Home({ mealsData }) {
  return (
    <>
      <Head>
        <title>Next Recipes App</title>
      </Head>
      <div className="home">
        <div className="container">
          <SearchBox />
          <HomeMeals data={mealsData} />
        </div>
      </div>
    </>
  );
}
