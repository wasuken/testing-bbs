import { waitFor, render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewCategoryForm from '../src/components/NewCategoryForm'

const mockOnSubmit = jest.fn()

const defaultProps = {
  onSubmit: mockOnSubmit,
  submitButtonText: '送信',
}

describe('NewCategoryForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  test('入力フィールドが正しく更新されること', async () => {
    render(<NewCategoryForm {...defaultProps} />)

    await userEvent.type(
      screen.getByPlaceholderText('タイトル'),
      '新しいタイトル',
      {
        delay: 1,
      },
    )

    await waitFor(async () => {
      expect(await screen.getByPlaceholderText('タイトル')).toHaveValue(
        '新しいタイトル',
      )
    })
  })

  test('必須フィールドが空の場合にエラーメッセージを表示すること', async () => {
    render(<NewCategoryForm {...defaultProps} />)

    await userEvent.clear(screen.getByPlaceholderText('タイトル'))

    fireEvent.click(await screen.getByRole('button', { name: /送信/i }))

    await waitFor(async () => {
      expect(await screen.getByText('タイトルは必須です。')).toBeInTheDocument()
    })
  })

  test('フォームが正しくサブミットされること', async () => {
    render(<NewCategoryForm {...defaultProps} />)

    await userEvent.type(
      screen.getByPlaceholderText('タイトル'),
      '新しいタイトル',
      {
        delay: 1,
      },
    )
    fireEvent.click(await screen.getByRole('button', { name: /送信/i }))

    await waitFor(async () => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith('新しいタイトル')
    })
  })

  test('サブミット時にエラーが発生した場合、エラーメッセージを表示すること', async () => {
    mockOnSubmit.mockRejectedValue(new Error('投稿に失敗しました。'))

    render(<NewCategoryForm {...defaultProps} />)
    await userEvent.type(
      screen.getByPlaceholderText('タイトル'),
      '新しいタイトル',
      {
        delay: 1,
      },
    )
    fireEvent.click(screen.getByRole('button', { name: /送信/i }))

    expect(await screen.findByText('投稿に失敗しました。')).toBeInTheDocument()
  })
})
