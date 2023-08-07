import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataQuotes } from "../../model/model";
import generator from "../../utils/generator";

const BASE_URL = "https://cloud.iexapis.com";

type initialState = {
  data: dataQuotes[];
  sorted: {
    column: string | null;
    direction: "asc" | "desc" | null;
  };
  searchValue: string;
  pagination: {
    limit: number;
    currentPage: number;
    countPages: number;
  };
  status: {
    isLoading: boolean;
    isError: string | null;
  };
};

const initialState: initialState = {
  data: [],
  sorted: {
    column: null,
    direction: null,
  },
  searchValue: "",
  pagination: {
    limit: 10,
    currentPage: 0,
    countPages: 0,
  },
  status: {
    isLoading: false,
    isError: null,
  },
};

export const fetchQuotes = createAsyncThunk<
  dataQuotes[],
  { token: string },
  { rejectValue: string }
>("quotes/fetchQuotes", async ({ token }, { rejectWithValue }) => {
  const response = await fetch(`${BASE_URL}/stable/tops?token=${token}`);

  if (!response.ok) {
    return rejectWithValue(`Error! Status Code: ${response.status}`);
  }

  const data = await response.json();

  return data as dataQuotes[];
});

// возможно стоит использовать ENUM
const generateSortedDirection = generator<"asc" | "desc" | null>([
  "asc",
  "desc",
  null,
]);

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    nextPage: ({ pagination }) => {
      if (pagination.countPages > pagination.currentPage) {
        pagination.currentPage += 1;
      }
    },
    prevPage: ({ pagination }) => {
      if (pagination.currentPage > 0) pagination.currentPage -= 1;
    },
    goToPage: ({ pagination }, action: PayloadAction<number>) => {
      if (action.payload <= pagination.countPages) {
        pagination.currentPage = action.payload;
      }
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      state.pagination.currentPage = 0;
    },
    switchSorting: (
      { sorted, pagination },
      action: PayloadAction<{ column: string }>
    ) => {
      pagination.currentPage = 0;

      if (sorted.column !== action.payload.column) {
        sorted.column = action.payload.column;
        sorted.direction = generateSortedDirection(true);
      } else {
        sorted.direction = generateSortedDirection();
      }
    },
    setCountPages: ({ pagination }, action: PayloadAction<number>) => {
      const countPages = Math.ceil(action.payload / pagination.limit);
      pagination.countPages = countPages === 0 ? 0 : countPages - 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotes.pending, (state) => {
        state.status.isLoading = true;
        state.status.isError = null;
      })
      .addCase(
        fetchQuotes.fulfilled,
        (state, action: PayloadAction<dataQuotes[]>) => {
          state.data = action.payload;
          state.status.isLoading = false;
        }
      )
      .addCase(
        fetchQuotes.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          if (action.payload) {
            state.status.isError = action.payload;
          } else {
            state.status.isError = "Unknown Error";
          }
        }
      );
  },
});

export const {
  switchSorting,
  setSearchValue,
  nextPage,
  goToPage,
  prevPage,
  setCountPages,
} = quotesSlice.actions;
export default quotesSlice.reducer;
