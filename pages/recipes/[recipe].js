import Head from "next/head";
import React from "react";

export async function getServerSideProps({ params }) {
  const res1 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.recipe}`
  );
  const data = await res1.json();

  return { props: { data } };
}

export async function getServerSidePaths() {
  const recipe = () => {
    return { params: { recipe } };
  };
}

function Recipe({ data }) {
  console.log(data);
  return (    
    <div>
      <Head>
        <title>{data.meals[0].strMeal}</title>
      </Head>
      <h1>{data.meals[0].strMeal}</h1>
    </div>
  );
}

export default Recipe;
