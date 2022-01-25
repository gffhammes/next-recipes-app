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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

  const mealTags = data.meals[0].strTags
    ? data.meals[0].strTags.split(",")
    : null;

  return (
    <div>
      <Head>
        <title>{data.meals[0].strMeal}</title>
      </Head>
      <div className="meal-page">
        <div className="meal-page__back-home ">
          <Link href={"/"}>
            <a>&larr; Home</a>
          </Link>
        </div>
        <div className="meal-page__image">
          <Image
            src={data.meals[0].strMealThumb}
            layout={"fill"}
            objectFit="cover"
          />
        </div>
        <div className="meal-page__infos shadow-3-reverse">
          <div className="meal-page__general container">
            <h1 className="meal-name">{data.meals[0].strMeal}</h1>
            <span className="meal-category">
              {typeof data.meals[0].strArea != "undefined"
                ? data.meals[0].strArea
                : ""}{" "}
              {data.meals[0].strCategory}
            </span>
            <ul className={mealTags ? "meal-tags" : "no-meal-tags"}>
              {mealTags &&
                mealTags.map((tag, index) => {
                  if (tag) {
                    return (
                      <li className="meal-tag" key={index}>
                        {tag}
                      </li>
                    );
                  } else {
                    return null;
                  }
                })}
            </ul>
          </div>

          <div className="meal-page__ingredients  container">
            <h2 className="title">Ingredients</h2>
            {ingredients.map((ingredient, index) => {
              return (
                <div key={index} className="meal-page__ingredient-card">
                  <span>
                    <strong>
                      {capitalizeFirstLetter(ingredient.name.toLowerCase())}
                    </strong>{" "}
                    &mdash; {ingredient.quantity}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="meal-page__instructions  container">
            <h2 className="title">Instructions</h2>
            <p>{data.meals[0].strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
