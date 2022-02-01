import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../AppContext";
import FooterMenu from "../../components/FooterMenu";

export async function getServerSideProps({ params }) {
  const strCategory = params.category.split("-")[0];
  const indexSplit = params.category.split("-");
  const index = indexSplit.pop();

  const res1 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`
  );
  const data = await res1.json();

  const category = params.category;

  return { props: { data, strCategory, index } };
}

export async function getServerSidePaths() {
  const category = () => {
    return { params: { category } };
  };
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function Category({ data, strCategory, index }) {
  const { categoriesData } = useContext(AppContext);

  const nextIndex =
    parseInt(index) + 1 === categoriesData.meals.length
      ? 0
      : parseInt(index) + 1;
  const prevIndex =
    parseInt(index) === 0
      ? categoriesData.meals.length - 1
      : parseInt(index) - 1;

  const nextStr = categoriesData.meals[nextIndex].strCategory;
  const prevStr = categoriesData.meals[prevIndex].strCategory;

  const nextSlug = `/categories/${nextStr.toLowerCase()}-${nextIndex}`;
  const prevSlug = `/categories/${prevStr.toLowerCase()}-${prevIndex}`;

  return (
    <div>
      <Head>
        <title>Category - {capitalizeFirstLetter(strCategory)}</title>
      </Head>
      <div id="page__title">
        <Link href={prevSlug}>
          <a className="prev-category">
            <i class="fas fa-chevron-circle-left"></i>
          </a>
        </Link>
        <h1>{capitalizeFirstLetter(strCategory)}</h1>
        <Link href={nextSlug}>
          <a className="next-category">
            <i class="fas fa-chevron-circle-right"></i>
          </a>
        </Link>
      </div>
      <div className="category-page">
        <div className="category-page__meals container">
          <div className="category-page__meals__cards">
            {data.meals.map((meal) => {
              return (
                <Link key={meal.idMeal} href={`/meals/${meal.idMeal}`}>
                  <a className="category-page__meals__cards__card shadow-2">
                    <div className="category-page__meals__cards__card-image">
                      <Image
                        src={meal.strMealThumb}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <h3>{meal.strMeal}</h3>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <FooterMenu />
    </div>
  );
}

export default Category;
