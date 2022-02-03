import { useEffect, useState } from "react";
import axios from "axios";

export default function useIngredientHook(query, pageNumber) {
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
      params: { q: query, page: pageNumber },
    }).then((res) => {
      console.log(res.data);
    });
  }, [query, pageNumber]);

  return null;
}
