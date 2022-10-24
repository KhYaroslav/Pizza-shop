import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params ) => {
    const { order, sortby, category, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://634ac3b05df95285141840ce.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortby}&order=${order}${search}`,
    );
    return data
  },
);

export const fetchPizzasId = createAsyncThunk<PizzaItem[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortby, category, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://634ac3b05df95285141840ce.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortby}&order=${order}${search}`,
    );
    return data;
  },
  );