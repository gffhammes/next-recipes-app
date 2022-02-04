import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FooterMenu from "../components/FooterMenu";
import MealCard from "../components/MealCard";
import axios from "axios";

// export async function getServerSideProps({ query }) {
//   var thisLetter = query.init;

//   if (thisLetter.charCodeAt(0) < 97 || thisLetter.charCodeAt(0) > 122) {
//     thisLetter = "a";
//   }

//   const resMeals = await fetch(
//     `http://www.themealdb.com/api/json/v1/1/search.php?f=${thisLetter}`
//   );
//   const mealsData = await resMeals.json();

//   return { props: { mealsData, thisLetter } };
// }

function nextChar(c) {
  if (c.charCodeAt(0) < 97 || c.charCodeAt(0) > 122) {
    return null;
  }

  if (c === "z") {
    return null;
  } else {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }
}

export default function Meals(
  {
    /*mealsData, thisLetter*/
  }
) {
  const nextSlug = "/"; //`/meals?init=${nextChar(thisLetter)}`;
  const prevSlug = "/"; //`/meals?init=${prevChar(thisLetter)}`;
  let init = "a";

  const [meals, setMeals] = useState([]);

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  const loadMoreMeals = () => {
    init &&
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${init}`)
        .then(({ data }) => {
          const newMeals = [];
          data.meals &&
            data.meals.forEach((meal) => {
              newMeals.push(meal);
            });
          setMeals((oldMeals) => [...oldMeals, ...newMeals]);
        });
    init = init ? nextChar(init) : null;
  };

  useEffect(() => {
    loadMoreMeals();
    loadMoreMeals();
    const bodyElement = document.getElementById("all-meals-page");

    bodyElement.addEventListener(
      "scroll",
      (event) => {
        sleep(500);
        handleScroll(bodyElement);
      },
      { passive: true }
    );
  }, []);

  const handleScroll = (element) => {
    const elementHeight = element.scrollHeight - element.offsetHeight;
    const { scrollTop } = element;
    if (scrollTop + 80 >= elementHeight) {
      loadMoreMeals();
    }
  };

  return (
    <>
      <Head>
        <title>All Meals{/*thisLetter.toUpperCase() */}</title>
      </Head>
      <div id="page__title">
        <h1>All Meals</h1>
        {/* <div className="meals-letters-menu">
          <Link href={prevSlug}>
            <a className="prev-category">
              <i class="fas fa-chevron-circle-left"></i>
            </a>
          </Link>
          <span className="current-letter">
            thisLetter.toUpperCase()
          </span>
          <Link href={nextSlug}>
            <a className="next-category">
              <i class="fas fa-chevron-circle-right"></i>
            </a>
          </Link>
        </div> */}
      </div>

      <div className="all-meals-page" id="all-meals-page">
        <div className="all-meals-page__meals container">
          <div className="all-meals-page__meals__cards">
            {meals ? (
              meals.map((meal, index) => {
                return meal && <MealCard key={index} meal={meal} />;
              })
            ) : (
              <div>No meals</div>
            )}
          </div>
        </div>
        <div className="loading">Loading...</div>
      </div>
      <FooterMenu />
    </>
  );
}
