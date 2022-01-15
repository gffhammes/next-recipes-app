import React from "react";
import Image from "next/image";

function HomeCategories({ data }) {
  console.log(data);

  return (
    <div className="home__categories">
      <h2 className="home__categories-title">Categories</h2>
      <div className="home__categories-categories">
        <div className="category">{data.meals[0].strCategory}</div>
        <div className="category">{data.meals[1].strCategory}</div>
        <div className="category">{data.meals[2].strCategory}</div>
        <div className="category">{data.meals[3].strCategory}</div>
        <div className="category">{data.meals[4].strCategory}</div>
        <div className="category">{data.meals[5].strCategory}</div>
      </div>
    </div>
  );
}

export default HomeCategories;
