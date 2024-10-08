import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostForm from "../src/components/PostForm";
import { PostFormProps } from "@/types";

const mockOnSubmit = jest.fn();

const defaultProps: PostFormProps = {
  initialPost: {
    title: "初期タイトル",
    content: "初期コンテンツ",
    author: "初期著者",
    category: { id: 1, title: "初期カテゴリ", createdAt: '2024-10-8 00:00:00' },
  },
  onSubmit: mockOnSubmit,
  submitButtonText: "送信",
  categories: [
    { id: 1, title: "初期カテゴリ" },
    { id: 2, title: "別カテゴリ" },
  ],
};

describe("PostForm", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test("フォームの初期値が正しく表示されること", () => {
    render(<PostForm {...defaultProps} />);

    expect(screen.getByPlaceholderText("ニックネーム")).toHaveValue("初期著者");
    expect(screen.getByPlaceholderText("タイトル")).toHaveValue("初期タイトル");
    expect(screen.getByPlaceholderText("コンテンツ")).toHaveValue("初期コンテンツ");
    const categorySelect = screen.getByRole("combobox");
    expect(categorySelect).toHaveValue("1");
  });

  test("入力フィールドが正しく更新されること", async () => {
    render(<PostForm {...defaultProps} />);

    await userEvent.clear(screen.getByPlaceholderText("ニックネーム"));
    await userEvent.clear(screen.getByPlaceholderText("タイトル"));
    await userEvent.clear(screen.getByPlaceholderText("コンテンツ"));

    await userEvent.type(screen.getByPlaceholderText("ニックネーム"), "新しい著者", {
      delay: 1,
    });
    await userEvent.type(screen.getByPlaceholderText("タイトル"), "新しいタイトル", {
      delay: 1,
    });
    await userEvent.type(screen.getByPlaceholderText("コンテンツ"), "新しいコンテンツ", {
      delay: 1,
    });

    expect(screen.getByPlaceholderText("ニックネーム")).toHaveValue("新しい著者");
    expect(screen.getByPlaceholderText("タイトル")).toHaveValue("新しいタイトル");
    expect(screen.getByPlaceholderText("コンテンツ")).toHaveValue("新しいコンテンツ");
  });

  test("必須フィールドが空の場合にエラーメッセージを表示すること", async () => {
    render(<PostForm {...defaultProps} />);

    await userEvent.clear(screen.getByPlaceholderText("タイトル"));
    await userEvent.clear(screen.getByPlaceholderText("コンテンツ"));

    fireEvent.click(screen.getByRole("button", { name: /送信/i }));

    expect(screen.getByText("タイトルと内容は必須です。")).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("フォームが正しくサブミットされること", () => {
    render(<PostForm {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: /送信/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith("初期タイトル", "初期コンテンツ", "初期著者", 1);
  });

  test("サブミット時にエラーが発生した場合、エラーメッセージを表示すること", async () => {
    mockOnSubmit.mockRejectedValue(new Error("投稿に失敗しました。"));

    render(<PostForm {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /送信/i }));

    expect(await screen.findByText("投稿に失敗しました。")).toBeInTheDocument();
  });
});
