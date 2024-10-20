import { render, screen } from '@testing-library/react'
import CategoryList from '../src/components/CategoryList'

const mockCategories = [
  {
    id: 1,
    title: 'test category 1',
    count: 987,
    createdAt: '2022-01-01 00:00:00',
  },
  {
    id: 2,
    title: 'test category 2',
    count: 234,
    createdAt: '2022-01-01 00:00:00',
  },
]

describe('CategoryList', () => {
  test('displays categories correctly', () => {
    render(<CategoryList categories={mockCategories} />)

    expect(screen.getByText('test category 1')).toBeInTheDocument()
    expect(screen.getByText(987)).toBeInTheDocument()
    expect(screen.getByText('test category 2')).toBeInTheDocument()
    expect(screen.getByText(234)).toBeInTheDocument()
  })
})
