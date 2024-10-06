import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { CategoryListProps } from "@/types";

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div>
      <h2>カテゴリ一覧</h2>
      <ListGroup>
        {categories.map((category) => (
          <ListGroup.Item key={category.id}>
            <h3>
              <a href={`/posts?categoryId=${category.id}`}>{category.title}</a>
            </h3>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CategoryList;
