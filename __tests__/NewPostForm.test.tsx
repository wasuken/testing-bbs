import { render, screen, fireEvent } from '@testing-library/react';
import NewPostForm from '../src/components/NewPostForm';

describe('NewPostForm', () => {
  test('renders form inputs', () => {
    render(<NewPostForm onSubmit={jest.fn()} />);

    const titleInput = screen.getByLabelText(/タイトル/i);
    const contentInput = screen.getByLabelText(/本文/i);
    expect(titleInput).toBeInTheDocument();
    expect(contentInput).toBeInTheDocument();
  });

  test('shows error message when fields are empty', async () => {
    render(<NewPostForm onSubmit={jest.fn()} />);

    const submitButton = screen.getByText(/投稿する/i);
    fireEvent.click(submitButton);

    expect(await screen.findByText(/タイトルと本文は必須です。/i)).toBeInTheDocument();
  });

  test('calls onSubmit with correct data', async () => {
    const mockSubmit = jest.fn();
    render(<NewPostForm onSubmit={mockSubmit} />);

    const titleInput = screen.getByLabelText(/タイトル/i);
    const contentInput = screen.getByLabelText(/本文/i);
    const submitButton = screen.getByText(/投稿する/i);

    fireEvent.change(titleInput, { target: { value: 'テストタイトル' } });
    fireEvent.change(contentInput, { target: { value: 'テスト内容' } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith('テストタイトル', 'テスト内容');
  });
});
