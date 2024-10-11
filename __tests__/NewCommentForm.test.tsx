import { waitFor, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewCommentForm from "../src/components/NewCommentForm";
import { NewCommentFormProps } from "@/types";

const mockOnSubmit = jest.fn();

const defaultProps = {
  onSubmit: mockOnSubmit,
  submitButtonText: "コメント送信",
};

describe("NewCommentForm", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test("入力フィールドが正しく更新されること", async () => {
    render(<NewCommentForm {...defaultProps} />);

    await userEvent.type(
      screen.getByPlaceholderText("ニックネーム"),
      "新しい著者",
      {
        delay: 1,
      },
    );
    await userEvent.type(
      screen.getByPlaceholderText("コメント"),
      "新しいコメント",
      {
        delay: 1,
      },
    );

    await waitFor(async () => {
      expect(await screen.getByPlaceholderText("ニックネーム")).toHaveValue(
        "新しい著者",
      );
      expect(await screen.getByPlaceholderText("コメント")).toHaveValue(
        "新しいコメント",
      );
    });
  });

  test("必須フィールドが空の場合にエラーメッセージを表示すること", async () => {
    render(<NewCommentForm {...defaultProps} />);

    await userEvent.clear(screen.getByPlaceholderText("ニックネーム"));
    await userEvent.clear(screen.getByPlaceholderText("コメント"));

    fireEvent.click(
      await screen.getByRole("button", { name: /コメント送信/i }),
    );

    await waitFor(async () => {
      expect(
        await screen.getByText("コメントは必須です。"),
      ).toBeInTheDocument();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  test("フォームが正しくサブミットされること", async () => {
    render(<NewCommentForm {...defaultProps} />);

    await userEvent.type(
      screen.getByPlaceholderText("ニックネーム"),
      "新しい著者",
      {
        delay: 1,
      },
    );
    await userEvent.type(
      screen.getByPlaceholderText("コメント"),
      "新しいコメント",
      {
        delay: 1,
      },
    );
    fireEvent.click(
      await screen.getByRole("button", { name: /コメント送信/i }),
    );

    await waitFor(async () => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith("新しいコメント", "新しい著者");
    });
  });

  test("サブミット時にエラーが発生した場合、エラーメッセージを表示すること", async () => {
    mockOnSubmit.mockRejectedValue(new Error("コメントの投稿に失敗しました。"));

    render(<NewCommentForm {...defaultProps} />);
    await userEvent.type(
      screen.getByPlaceholderText("コメント"),
      "新しいコメント",
      {
        delay: 1,
      },
    );
    fireEvent.click(screen.getByRole("button", { name: /コメント送信/i }));

    expect(
      await screen.findByText("コメントの投稿に失敗しました。"),
    ).toBeInTheDocument();
  });
});
