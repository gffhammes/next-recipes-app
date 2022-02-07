import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function HomeMeals({ data }) {
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
    <div className="home__meals container">
      <div className="home__meals-title title">
        <h2>Random Meals</h2>
        {!(windowWidth > 960) && (
          <Link href="meals">
            <a>See all</a>
          </Link>
        )}
      </div>

      <div className="home__meals-meals-wrapper">
        <div className="home__meals-meals">
          {data.map((meal, index) => {
            return (
              <Link key={meal.id} href={`meals/${meal.id}`}>
                <a
                  id={`index-${index}`}
                  className="home__meals-meal-wrapper shadow-2"
                >
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
          {windowWidth > 960 && (
            <Link href={`meals`}>
              <a className="home__meals-meal-wrapper">
                <div className="meal-card-content see-all">
                  <span>See all</span>
                </div>
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeMeals;
