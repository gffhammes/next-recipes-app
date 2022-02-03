import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryCard(category) {
  category = category.category;
  return (
    <Link
      href={`categories/${category.strCategory.toLowerCase()}-${
        category.index
      }`}
    >
      <a className="category-card">
        <div className="cover-gradient"></div>
        <div className="card-image">
          <Image
            src={category.thumb ? category.thumb : "/"}
            alt={category.strCategory}
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
        <h3>{category.strCategory}</h3>
      </a>
    </Link>
  );
}

export default CategoryCard;
