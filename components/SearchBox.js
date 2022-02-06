import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MealCard from "./MealCard";

function SearchBox() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    let matchingMeals = [];

    if (value.length > 1) {
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${value.toLowerCase()}`
        )
        .then(({ data }) => {
          data.meals &&
            data.meals.forEach((meal) => {
              matchingMeals.push(meal);
            });
          setMeals(matchingMeals);
        });
    }
  };

  return (
    <div className="search_box container">
      <input
        placeholder="Search for a meal"
        type="text"
        value={query}
        onChange={onChange}
      />
      {query ? (
        <div className="query-results ">
          <div className="results-wrapper container shadow-3">
            <div className="results">
              {meals.map((meal, index) => {
                return (
                  <Link key={index} href={`/meals/${meal.idMeal}`}>
                    <a className="">
                      <span>{meal.strMeal}</span>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
}

export default SearchBox;
