"use client";
import NewCategoryForm from "@/components/NewCategoryForm";
import { useEffect, useState } from "react";

// カテゴリ一覧
const CategoryPage: React.FC = () => {
  const postCategory = async (category: string) => {
    const response = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({
        title: category,
      }),
    });
    const data = await response.json();
    setCategory("");
  };

  return <NewCategoryForm onSubmit={postCategory} />;
};

export default CategoryPage;
