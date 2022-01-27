import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FooterMenu from "../../components/FooterMenu";

export async function getServerSideProps({ params }) {
  const res1 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`
  );
  const data = await res1.json();

  const category = params.category;

  return { props: { data, category } };
}

export async function getServerSidePaths() {
  const category = () => {
    return { params: { category } };
  };
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function vh(v) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (v * w) / 100;
}

function Category({ data, category }) {
  return (
    <div>
      <Head>
        <title>Category - {capitalizeFirstLetter(category)}</title>
      </Head>
      <div className="category-page">
        <div className="category-page__meals container">
          <div className="category-page__title">
            <span>Category</span>
            <h1>{capitalizeFirstLetter(category)}</h1>
          </div>
          <div className="category-page__meals__cards">
            {data.meals.map((meal) => {
              return (
                <Link key={meal.idMeal} href={`/recipes/${meal.idMeal}`}>
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
