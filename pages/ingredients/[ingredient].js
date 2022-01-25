import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function getServerSideProps({ params }) {
  const res1 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${params.ingredient}`
  );
  const data = await res1.json();

  const ingredient = params.ingredient;

  return { props: { data, ingredient } };
}

export async function getServerSidePaths() {
  const ingredient = () => {
    return { params: { ingredient } };
  };
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Ingredient({ data, ingredient }) {
  return (
    <div>
      <Head>
        <title>{capitalizeFirstLetter(ingredient)}</title>
      </Head>
      <div className="ingredient-page">
        <div className="ingredient-page__back-home">
          <Link href={"/"}>
            <a>&larr;Home</a>
          </Link>
        </div>
        <div className="ingredient-page__meals">
          <h1>{capitalizeFirstLetter(ingredient)}</h1>
          <div className="ingredient-page__meals__cards">
            {data.meals.map((meal) => {
              return (
                <Link
                  key={meal.idMeal}
                  className="ingredient-page__meals__cards__card"
                  href={`/recipes/${meal.idMeal}`}
                >
                  <a>
                    <div className="ingredient-page__meals__cards__card-image">
                      <Image src={meal.strMealThumb} layout="fill" />
                    </div>
                    <h3>{meal.strMeal}</h3>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ingredient;
