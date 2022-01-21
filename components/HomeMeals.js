import React from "react";
import Image from "next/image";
import Link from "next/link";

function HomeMeals({ data }) {
  return (
    <div className="home__meals">
      <h2 className="home__meals-title title container">Meals</h2>
      <div className="home__meals-meals">
        {data.map((meal, index) => {
          console.log(meal);
          return (
            <Link key={meal.meals[0].idMeal} href={`/recipes/${meal.meals[0].idMeal}`}>
              <a className="home__meals-meal-wrapper shadow-2">
                <Image
                  className="meal-card-image"
                  alt={meal.meals[0].strMeal}
                  src={meal.meals[0].strMealThumb}
                  layout="fill"
                  priority={true}
                  objectFit="cover"
                />
                <div className="meal-card-cover-gradient"></div>
                <div className="meal-card-content">
                  <h3 className="meal-name">{meal.meals[0].strMeal}</h3>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomeMeals;
