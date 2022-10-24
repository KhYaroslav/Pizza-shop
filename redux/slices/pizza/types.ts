export type PizzaItem = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[],
  rating: number,
}

export interface PizzaSliceState {
  items: PizzaItem[],
  status: 'loading' | 'success'| 'error',
}

export type SearchPizzaParams = {
  order: string,
  sortby: string,
  category: string,
  search: string,
  currentPage: string,
}