import Head from "next/head";
import React, { useContext } from "react";
import AppContext from "../AppContext";
import CategoryCard from "../components/CategoryCard";
import FooterMenu from "../components/FooterMenu";

export default function Categories() {
  const { categoriesData } = useContext(AppContext);

  addThumbToCategories();

  function addThumbToCategories() {
    //beef
    categoriesData.meals[0].thumb =
      "https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    //breakfast
    categoriesData.meals[1].thumb =
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    //Chicken
    categoriesData.meals[2].thumb =
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    //Dessert
    categoriesData.meals[3].thumb =
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1078&q=80";
    //Goat
    categoriesData.meals[4].thumb =
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    //Lamb
    categoriesData.meals[5].thumb =
      "https://images.unsplash.com/photo-1602473812169-ede177b00aea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    //Miscellaneous
    categoriesData.meals[6].thumb =
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    //Pasta
    categoriesData.meals[7].thumb =
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";
    //Pork
    categoriesData.meals[8].thumb =
      "https://images.unsplash.com/photo-1623047437095-27418540c288?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";
    //Seafood
    categoriesData.meals[9].thumb =
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";
    //Side
    categoriesData.meals[10].thumb =
      "https://images.unsplash.com/photo-1534938665420-4193effeacc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";
    //Starter
    categoriesData.meals[11].thumb =
      "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";
    //Vegan
    categoriesData.meals[12].thumb =
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    //Vegetarian
    categoriesData.meals[13].thumb =
      "https://images.unsplash.com/photo-1598449426314-8b02525e8733?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80";
  }

  return (
    <>
      <Head>
        <title>All Categories</title>
      </Head>
      <div id="page__title">
        <h1>All Categories</h1>
      </div>

      <div className="all-categories-page">
        <div className="all-categories-page__categories container">
          <div className="all-categories-page__categories__cards">
            {categoriesData.meals.map((category) => {
              return <CategoryCard category={category} key={category.index} />;
            })}
          </div>
        </div>
      </div>
      <FooterMenu />
    </>
  );
}
