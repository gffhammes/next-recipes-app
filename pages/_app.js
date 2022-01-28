import "../styles/main.scss";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import React, { createContext } from "react";
import AppContext from "../AppContext";

const progress = new ProgressBar({
  size: 5,
  color: "#67a936",
  className: "bar-of-progress",
  delay: 50,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const categoriesRes = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  );
  const categoriesData = await categoriesRes.json();
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  categoriesData.meals.map((category, index) => {
    category.index = index;
  });

  return { pageProps, categoriesData };
};

function MyApp({ Component, pageProps, categoriesData }) {
  return (
    <AppContext.Provider value={categoriesData}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
