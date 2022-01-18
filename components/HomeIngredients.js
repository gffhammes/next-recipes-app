import React from "react";
import Image from "next/image";

function HomeIngredients({ data }) {
  console.log(data);
  return (
    <div className="home__ingredients container">
      <h2 className="home__ingredients-title title">Ingredients</h2>
      <div className="home__ingredients-ingredients">
        {data.map((ingredient, index) => {
          return (
            <div key={index} className="ingredient-card">
              <div className="ingredient-image">
                <Image
                  src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                  alt={ingredient.strIngredient}
                  layout="fill"
                  priority={true}
                />
              </div>
              <h3>{ingredient.strIngredient}</h3>
              <span>
                {ingredient.recipes.meals ? ingredient.recipes.meals.length : 0}{" "}
                recipes
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeIngredients;
