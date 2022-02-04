import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import IngredientCard from "../components/IngredientCard";
import FooterMenu from "../components/FooterMenu";

export default function Ingredients() {
  let offset = 0;

  const { ingredientsData } = useContext(AppContext);

  const [ingredients, setIngredients] = useState([]);

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  const loadMoreIngredients = () => {
    const newIngredients = [];

    ingredientsData.meals.slice(offset, offset + 20).forEach((ingredient) => {
      newIngredients.push(ingredient);
    });

    setIngredients((oldIngredients) => [...oldIngredients, ...newIngredients]);

    offset += 20;
  };

  const handleScroll = (element) => {
    const elementHeight = element.scrollHeight - element.offsetHeight;
    const { scrollTop } = element;
    if (scrollTop + 1 >= elementHeight) {
      sleep(1000);
      loadMoreIngredients();
    }
  };

  useEffect(() => {
    loadMoreIngredients();
    const bodyElement = document.getElementById("all-ingredients-page");

    bodyElement.addEventListener(
      "scroll",
      (event) => {
        handleScroll(bodyElement);
      },
      { passive: true }
    );
  }, []);

  return (
    <>
      <Head>
        <title>All Ingredients</title>
      </Head>
      <div id="page__title">
        <h1>All Ingredients</h1>
      </div>
      <div className="all-ingredients-page" id="all-ingredients-page">
        <div className="all-ingredients-page__ingredients container">
          <div className="all-ingredients-page__ingredients__cards">
            {Array.from(ingredients).map((ingredient) => {
              return (
                <IngredientCard
                  ingredient={ingredient}
                  key={ingredient.idIngredient}
                />
              );
            })}

            <div className="loading">Loading...</div>
          </div>
        </div>
      </div>
      <FooterMenu />
    </>
  );
}
