import { render, screen } from "@testing-library/react";
import CommentList from "../src/components/CommentList";

const mockComments = [
  {
    id: 1,
    post_id: 2,
    content: "コンテンツ1",
    author: "ユーザーA",
    createdAt: "2024-09-01",
  },
  {
    id: 2,
    post_id: 2,
    content: "コンテンツ2",
    author: "ユーザーB",
    createdAt: "2024-09-02",
  },
];

describe("CommentList", () => {
  test("displays comments correctly", () => {
    render(<CommentList comments={mockComments} />);

    expect(screen.getByText("コンテンツ1")).toBeInTheDocument();
    expect(screen.getByText("投稿者: ユーザーA")).toBeInTheDocument();
    expect(screen.getByText("投稿日: 2024-09-01")).toBeInTheDocument();
    expect(screen.getByText("コンテンツ2")).toBeInTheDocument();
    expect(screen.getByText("投稿者: ユーザーB")).toBeInTheDocument();
    expect(screen.getByText("投稿日: 2024-09-02")).toBeInTheDocument();
  });
});
