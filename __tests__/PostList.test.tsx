import { render, screen } from "@testing-library/react";
import PostList from "../src/components/PostList";

const mockPosts = [
  {
    id: 1,
    title: "テスト投稿1",
    content: "コンテンツ1",
    author: "ユーザーA",
    createdAt: "2024-09-01",
  },
  {
    id: 2,
    title: "テスト投稿2",
    content: "コンテンツ2",
    author: "ユーザーB",
    createdAt: "2024-09-02",
  },
];

describe("PostList", () => {
  test("displays posts correctly", () => {
    render(<PostList posts={mockPosts} />);

    expect(screen.getByText(/投稿一覧/i)).toBeInTheDocument();
    expect(screen.getByText("テスト投稿1")).toBeInTheDocument();
    expect(screen.getByText("投稿者: ユーザーA")).toBeInTheDocument();
    expect(screen.getByText("投稿日: 2024-09-01")).toBeInTheDocument();
    expect(screen.getByText("テスト投稿2")).toBeInTheDocument();
    expect(screen.getByText("投稿者: ユーザーB")).toBeInTheDocument();
    expect(screen.getByText("投稿日: 2024-09-02")).toBeInTheDocument();
  });
});
