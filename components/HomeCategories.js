import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function HomeCategories({ data }) {
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
    <div className="home__categories container">
      <div className="home__categories-title title">
        <h2>Main Categories</h2>
        {!(windowWidth > 960) && (
          <Link href="categories">
            <a>See all</a>
          </Link>
        )}
      </div>
      <div className="home__categories-categories">
        {data.meals.slice(0, 7).map((category, index) => {
          return (
            <Link
              href={`/categories/${category.strCategory.toLowerCase()}-${index}`}
              key={index}
            >
              <a className="category-card shadow-2">{category.strCategory}</a>
            </Link>
          );
        })}
        {windowWidth > 960 && (
          <Link href={`categories`}>
            <a className="category-card see-all">
              <div className="category-card-content ">
                <span className="category-name">See all</span>
              </div>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomeCategories;
