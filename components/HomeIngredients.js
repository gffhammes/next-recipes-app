import React from "react";
import Image from "next/image";

function HomeIngredients({ data }) {
  const ingredient = data.meals[Math.floor((Math.random()*data.meals.length))];    

  // Shuffle array
  const shuffled = data.meals.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, 20);

  console.log(ingredient);
  console.log(selected);

  return (
    <div className="home__ingredients">
      <h2 className="home__ingredients-title">Ingredients</h2>
      <div className="home__ingredients-ingredients">
        {/*data.meals.map((ingredient, index) => {
          return (
            <div key={index} className="category">{category.strCategory}</div>
          )
        })*/}
      </div>
    </div>
  );
}

export default HomeIngredients;
