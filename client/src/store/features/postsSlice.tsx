import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Post {
    id: number;
    userId: number;
    title: string;
    description: string;
    skills : string[];
    image: null | string;
    duration : number;
    experience : number;
    location: string;
    remote: boolean;
    company: string;
    offerMin: number;
    offerMax: number;
    startDate: string;
    createdAt: string;
    updatedAt: string;
}

interface PostsState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}


const initialState : PostsState = {
    posts: [],
    loading: false,
    error: null,
};

export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts',
    async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/post/'); // Adjust the URL as needed
            return response.data.posts; // Assuming the API returns an object with a 'posts' array
        } catch (error) {
            const err = error as { status : number , response: { data: { error: string } } };
            throw err.response?.data?.error || 'Failed to fetch posts';
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Ensure payload is a string
            });
    },
})

export const { setPosts, setLoading, setError } = postsSlice.actions;
export const selectPosts = (state: { posts: PostsState }) => state.posts.posts;
export const selectPostsLoading = (state: { posts: PostsState }) => state.posts.loading;
export const selectPostsError = (state: { posts: PostsState }) => state.posts.error;

export default postsSlice.reducer;