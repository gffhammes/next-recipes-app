import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../AppContext";
import FooterMenu from "../../components/FooterMenu";
import MealCard from "../../components/MealCard";

export async function getServerSideProps({ params }) {
  const strIngredient = params.ingredient.split("-")[0];
  const indexSplit = params.ingredient.split("-");
  const index = indexSplit.pop();

  const res1 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`
  );
  const data = await res1.json();

  const ingredient = params.ingredient;

  return { props: { data, strIngredient, index } };
}

export async function getServerSidePaths() {
  const ingredient = () => {
    return { params: { ingredient } };
  };
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// function Ingredient({ data, ingredient }) {
//   return (
//     <div>
//       <Head>
//         <title>{capitalizeFirstLetter(ingredient)}</title>
//       </Head>
//       <div className="ingredient-page">
//         <div className="ingredient-page__back-home">
//           <Link href={"/"}>
//             <a>&larr;Home</a>
//           </Link>
//         </div>
//         <div className="ingredient-page__meals">
//           <h1>{capitalizeFirstLetter(ingredient)}</h1>
//           <div className="ingredient-page__meals__cards">
//             {data.meals.map((meal) => {
//               return (
//                 <Link
//                   key={meal.idMeal}
//                   className="ingredient-page__meals__cards__card"
//                   href={`/recipes/${meal.idMeal}`}
//                 >
//                   <a>
//                     <div className="ingredient-page__meals__cards__card-image">
//                       <Image src={meal.strMealThumb} layout="fill" />
//                     </div>
//                     <h3>{meal.strMeal}</h3>
//                   </a>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function Ingredient({ data, strIngredient, index }) {
  const { ingredientsData } = useContext(AppContext);

  const nextIndex =
    parseInt(index) + 1 === ingredientsData.meals.length
      ? 0
      : parseInt(index) + 1;
  const prevIndex =
    parseInt(index) === 0
      ? ingredientsData.meals.length - 1
      : parseInt(index) - 1;

  const nextStr = ingredientsData.meals[nextIndex].strIngredient;
  const prevStr = ingredientsData.meals[prevIndex].strIngredient;

  const nextSlug = `/ingredients/${nextStr.toLowerCase()}-${nextIndex}`;
  const prevSlug = `/ingredients/${prevStr.toLowerCase()}-${prevIndex}`;

  return (
    <div>
      <Head>
        <title>Ingredient - {capitalizeFirstLetter(strIngredient)}</title>
      </Head>
      <div id="page__title">
        <Link href={prevSlug}>
          <a className="prev-category">
            <i class="fas fa-chevron-circle-left"></i>
          </a>
        </Link>
        <h1>{capitalizeFirstLetter(strIngredient)}</h1>
        <Link href={nextSlug}>
          <a className="next-category">
            <i class="fas fa-chevron-circle-right"></i>
          </a>
        </Link>
      </div>
      <div className="category-page">
        <div className="category-page__meals container">
          <div className="category-page__meals__cards">
            {!data.meals ? (
              <div>No recipes</div>
            ) : (
              data.meals.map((meal) => {
                return <MealCard meal={meal} />;
              })
            )}
            {}
          </div>
        </div>
      </div>
      <FooterMenu />
    </div>
  );
}

export default Ingredient;
