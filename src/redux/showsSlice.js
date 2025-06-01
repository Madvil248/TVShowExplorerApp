import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://api.tvmaze.com';

export const fetchShowsAsync = createAsyncThunk(
    'shows/fetchShows',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/shows`);
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch shows:", error);
            return rejectWithValue(error.message || "Failed to load shows.");
        }
    }
);

export const fetchShowDetailsAsync = createAsyncThunk(
    'shows/fetchShowDetails',
    async (showId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/shows/${showId}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch show details:", error);
            return rejectWithValue(error.message || "Failed to load show details.");
        }
    }
);

const showsSlice = createSlice({
    name: 'shows',
    initialState: {
        list: [],
        listLoading: false,
        listError: null,
        details: null,
        detailsLoading: false,
        detailsError: null,
        searchQuery: '',
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShowsAsync.pending, (state) => {
                state.listLoading = true;
                state.listError = null;
            })
            .addCase(fetchShowsAsync.fulfilled, (state, action) => {
                state.listLoading = false;
                state.list = action.payload;
            })
            .addCase(fetchShowsAsync.rejected, (state, action) => {
                state.listLoading = false;
                state.listError = action.payload || "Failed to load shows.";
            })
            .addCase(fetchShowDetailsAsync.pending, (state) => {
                state.detailsLoading = true;
                state.detailsError = null;
                state.details = null;
            })
            .addCase(fetchShowDetailsAsync.fulfilled, (state, action) => {
                state.detailsLoading = false;
                state.details = action.payload;
            })
            .addCase(fetchShowDetailsAsync.rejected, (state, action) => {
                state.detailsLoading = false;
                state.detailsError = action.payload || "Failed to load show details.";
            });
    },
});

export const { setSearchQuery } = showsSlice.actions;
export default showsSlice.reducer;