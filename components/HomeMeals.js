import React from "react";
import Image from "next/image";
import Link from "next/link";

function HomeMeals({ data }) {
  console.log(data);

  return (
    <div className="home__meals">
      <div className="home__meals-title title container">
        <h2>Random Meals</h2>
        <Link href="meals?init=a">
          <a>See all</a>
        </Link>
      </div>

      <div className="home__meals-meals-wrapper">
        <div className="home__meals-meals">
          {data.map((meal) => {
            return (
              <Link
                key={meal.id}
                href={`meals/${meal.id}`}
              >
                <a className="home__meals-meal-wrapper shadow-2">
                  <Image
                    className="meal-card-image"
                    alt={meal.name}
                    src={meal.thumb}
                    layout="fill"
                    priority={true}
                    objectFit="cover"
                  />
                  <div className="meal-card-cover-gradient"></div>
                  <div className="meal-card-content">
                    <h3 className="meal-name">{meal.name}</h3>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomeMeals;
