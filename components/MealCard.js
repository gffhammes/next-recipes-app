import Image from "next/image";
import Link from "next/link";
import React from "react";

function MealCard(meal) {
  meal = meal.meal;
  return (
    <Link key={meal.idMeal} href={`/meals/${meal.idMeal}`}>
      <a className="category-page__meals__cards__card shadow-2">
        <div className="category-page__meals__cards__card-image">
          <Image src={meal.strMealThumb} layout="fill" objectFit="cover" priority={true} />
        </div>
        <h3>{meal.strMeal}</h3>
      </a>
    </Link>
  );
}

export default MealCard;
