import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FooterMenu from "../components/FooterMenu";
import MealCard from "../components/MealCard";

export async function getServerSideProps({ query }) {
  var thisLetter = query.init;

  if (thisLetter.charCodeAt(0) < 97 || thisLetter.charCodeAt(0) > 122) {
    thisLetter = "a";
  }

  const resMeals = await fetch(
    `http://www.themealdb.com/api/json/v1/1/search.php?f=${thisLetter}`
  );
  const mealsData = await resMeals.json();

  return { props: { mealsData, thisLetter } };
}

function nextChar(c) {
  if (c.charCodeAt(0) < 97 || c.charCodeAt(0) > 122) {
    return "a";
  }

  if (c === "z") {
    return "a";
  } else {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }
}

function prevChar(c) {
  if (c.charCodeAt(0) < 97 || c.charCodeAt(0) > 122) {
    return "z";
  }

  if (c === "a") {
    return "z";
  } else {
    return String.fromCharCode(c.charCodeAt(0) - 1);
  }
}

export default function Meals({ mealsData, thisLetter }) {
  const nextSlug = `/meals?init=${nextChar(thisLetter)}`;
  const prevSlug = `/meals?init=${prevChar(thisLetter)}`;
  return (
    <>
      <Head>
        <title>Meals - {thisLetter.toUpperCase()}</title>
      </Head>
      <div id="page__title">
        <h1>All Meals</h1>
        <div className="meals-letters-menu">
          <Link href={prevSlug}>
            <a className="prev-category">
              <i class="fas fa-chevron-circle-left"></i>
            </a>
          </Link>
          <span className="current-letter">{thisLetter.toUpperCase()}</span>
          <Link href={nextSlug}>
            <a className="next-category">
              <i class="fas fa-chevron-circle-right"></i>
            </a>
          </Link>
        </div>
      </div>

      <div className="all-meals-page">
        <div className="all-meals-page__meals container">
          <div className="all-meals-page__meals__cards">
            {mealsData.meals ?
              mealsData.meals.map((meal) => {
                return <MealCard key={meal.idMeal} meal={meal} />;
              }) : <div>No meals</div>}
          </div>
        </div>
      </div>
      <FooterMenu />
    </>
  );
}
