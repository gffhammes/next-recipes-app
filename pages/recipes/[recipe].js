import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import FooterMenu from "../../components/FooterMenu";

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

function vh(v) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (v * w) / 100;
}

const truncate = (input, reqLength) =>
  input.length > reqLength ? `${input.substring(0, reqLength)}...` : input;

function Recipe({ data }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (process.browser && scrollY) {
    document.getElementById("meal-page__blur-image").style.filter = `blur(${
      scrollY / 50
    }px)`;
    if (scrollY > vh(40)) {
      document.getElementById("meal-page__meal-name").classList.add("show");
    } else {
      document.getElementById("meal-page__meal-name").classList.remove("show");
    }
  }

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
        <div className="meal-page__meal-name" id="meal-page__meal-name">
          <h1 className="meal-name">{truncate(data.meals[0].strMeal, 37)}</h1>
        </div>
        <div className="meal-page__blur-image" id="meal-page__blur-image">
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
      <FooterMenu />
    </div>
  );
}

export default Recipe;
