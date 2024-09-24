import { render, screen } from "@testing-library/react";
import PostDetail from "../src/components/PostDetail";

const mockComments = [
  { id: 1, content: "コメント1", author: "ユーザーA", createdAt: "2024-09-01" },
  { id: 2, content: "コメント2", author: "ユーザーB", createdAt: "2024-09-02" },
];

describe("PostDetail", () => {
  test("renders post details and comments", () => {
    render(
      <PostDetail
        title="テスト投稿jfkldjaklfjkdalsjfkldsa"
        content="これはテスト投稿の内容です。"
        author="投稿者A"
        createdAt="2024-09-04"
        comments={mockComments}
        onDelete={() => {}}
      />,
    );

    expect(
      screen.getByText(/テスト投稿jfkldjaklfjkdalsjfkldsa/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/これはテスト投稿の内容です。/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/投稿者: 投稿者A/i)).toBeInTheDocument();
    expect(screen.getByText(/投稿日: 2024-09-04/i)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /コメント/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/コメント1/i)).toBeInTheDocument();
    expect(screen.getByText(/投稿者: ユーザーA/i)).toBeInTheDocument();
    expect(screen.getByText(/コメント2/i)).toBeInTheDocument();
    expect(screen.getByText(/投稿者: ユーザーB/i)).toBeInTheDocument();
  });
});
