import Head from "next/head";
import React, { useContext, useState } from "react";
import AppContext from "../AppContext";
import IngredientCard from "../components/IngredientCard";
import FooterMenu from "../components/FooterMenu";

export default function Ingredients() {
  const { ingredientsData } = useContext(AppContext);
  const [ingredientsQty, setIngredientsQty] = useState(20);

  console.log(ingredientsData);

  return (
    <>
      <Head>
        <title>All Ingredients</title>
      </Head>
      <div id="page__title">
        <h1>All Ingredients</h1>
      </div>
      <div className="all-ingredients-page">
        <div className="all-ingredients-page__ingredients container">
          <div className="all-ingredients-page__ingredients__cards">
            {ingredientsData.meals
              .slice(0, ingredientsQty)
              .map((ingredient) => {
                return (
                  <IngredientCard
                    ingredient={ingredient}
                    key={ingredient.idIngredient}
                  />
                );
              })}
          </div>
        </div>
        <button
          onClick={() => {
            if (ingredientsQty + 20 < ingredientsData.meals.length) {
              setIngredientsQty(ingredientsQty + 20);
            } else {
              const toEnd = ingredientsData.meals.length - ingredientsQty;
              setIngredientsQty(ingredientsQty + toEnd);
            }
          }}
          className="container"
        >
          More
        </button>
      </div>
      <FooterMenu />
    </>
  );
}
