import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function HomeIngredients({ data }) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    handleResize();
    window.addEventListener(
      "resize",
      (event) => {
        handleResize();
      },
      { passive: true }
    );
  }, []);

  const handleResize = () => {
    var w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );

    setWindowWidth(w);
  };

  return (
    <div className="home__ingredients container">
      <div className="home__ingredients-title title">
        <h2>Popular Ingredients</h2>
        {!(windowWidth > 960) && (
          <Link href="ingredients">
            <a>See all</a>
          </Link>
        )}
      </div>
      <div className="home__ingredients-ingredients">
        {data.meals.slice(0, 7).map((ingredient, index) => {
          return (
            <Link
              href={`/ingredients/${ingredient.strIngredient.toLowerCase()}-${index}`}
              key={index}
            >
              <a className="ingredient-card shadow-2">
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
        {windowWidth > 960 && (
          <Link href={`ingredients`}>
            <a className="ingredient-card see-all">
              <span className="category-name">See all</span>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomeIngredients;
