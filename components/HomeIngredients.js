import React from "react";
import Image from "next/image";
import Link from "next/link";

function HomeIngredients({ data }) {
  return (
    <div className="home__ingredients container">
      <h2 className="home__ingredients-title title">Popular Ingredients</h2>
      <div className="home__ingredients-ingredients">
        {data.meals.slice(0, 6).map((ingredient, index) => {
          return (
            <Link
              href={`/ingredients/${ingredient.strIngredient.toLowerCase()}-${index}`}
              key={index}
            >
              <a className="ingredient-card">
                <div className="ingredient-image">
                  <Image
                    src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                    alt={ingredient.strIngredient}
                    layout="fill"
                    priority={true}
                  />
                </div>
                <h3>{ingredient.strIngredient}</h3>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomeIngredients;
