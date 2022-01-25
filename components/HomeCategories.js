import React from "react";
import Image from "next/image";
import Link from "next/link";

function HomeCategories({ data }) {
  return (
    <div className="home__categories container">
      <h2 className="home__categories-title title">Categories</h2>
      <div className="home__categories-categories">
        {data.meals.map((category, index) => {
          return (
            <Link
              href={`/categories/${category.strCategory.toLowerCase()}`}
              key={index}
            >
              <a className="category-card shadow-1">{category.strCategory}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomeCategories;
