import Image from "next/image";
import Link from "next/link";
import React from "react";

function IngredientCard(ingredient) {
  ingredient = ingredient.ingredient;

  return (
    <Link
      href={`ingredients/${ingredient.strIngredient}-${ingredient.idIngredient}`}
    >
      <a className="ingredient-card">
        <div className="cover-gradient"></div>
        <div className="card-image">
          <Image
            src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
            alt={ingredient.strIngredient}
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
        <h3>{ingredient.strIngredient}</h3>
      </a>
    </Link>
  );
}

export default IngredientCard;
