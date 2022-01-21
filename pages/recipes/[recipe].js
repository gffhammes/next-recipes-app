import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function getServerSideProps({ params }) {
  const res1 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.recipe}`
  );
  const data = await res1.json();

  return { props: { data } };
}

export async function getServerSidePaths() {
  const recipe = () => {
    return { params: { recipe } };
  };
}

function Recipe({ data }) {
  console.log(data);

  const ingredients = [];

  for (let i = 0; i < 20; i++) {
    if (data.meals[0]["strIngredient" + i]) {
      ingredients.push({
        name: data.meals[0]["strIngredient" + i],
        quantity: data.meals[0]["strMeasure" + i],
      });
    }
  }

  console.log(ingredients);

  return (
    <div>
      <Head>
        <title>{data.meals[0].strMeal}</title>
      </Head>
      <div className="meal-page">
        <div className="meal-page__back-home">
          <Link href={"/"}>
            <a>&larr;Home</a>
          </Link>
        </div>
        <div className="meal-page__image">
          <Image
            src={data.meals[0].strMealThumb}
            layout={"fill"}
            objectFit="cover"
          />
        </div>
        <div className="meal-page__infos container">
          <h1>{data.meals[0].strMeal}</h1>

          <div className="meal-page__ingredients">
            <div className="meal-page__ingredient-card"></div>
          </div>

          <div className="meal-page__instructions">
            <p>{data.meals[0].strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
