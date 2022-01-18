import React from "react";
import Image from "next/image";

function HomeCategories({ data }) {
  return (
    <div className="home__categories container">
      <h2 className="home__categories-title title">Categories</h2>
      <div className="home__categories-categories">
        {data.meals.map((category, index) => {
          return (
            <div key={index} className="category-card shadow-1">
              {category.strCategory}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeCategories;
