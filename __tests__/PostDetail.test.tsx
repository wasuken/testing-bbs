import { render, screen } from "@testing-library/react";
import PostDetail from "../src/components/PostDetail";

const mockPost = {
  id: 1,
  title: "テスト投稿jfkldjaklfjkdalsjfkldsa",
  content: "これはテスト投稿の内容です。",
  author: "投稿者A",
  category: {
    id: 1,
    title: "test category",
    createdAt: "2022-01-01 00:00:00",
  },
  createdAt: "2024-09-04",
};

describe("PostDetail", () => {
  test("renders post details and comments", () => {
    render(
      <PostDetail post={mockPost} onDelete={() => {}} onEdit={() => {}} />,
    );

    expect(
      screen.getByText(/テスト投稿jfkldjaklfjkdalsjfkldsa/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/これはテスト投稿の内容です。/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/投稿者: 投稿者A/i)).toBeInTheDocument();
    expect(screen.getByText(/投稿日: 2024-09-04/i)).toBeInTheDocument();
  });
});
