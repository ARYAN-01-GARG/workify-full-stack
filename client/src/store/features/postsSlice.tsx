import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface PostsState {
    posts: Post[];
    showPost: Post | null;
    savedPosts : Post[];
    loading: boolean;
    error: string | null;
}


const initialState : PostsState = {
    posts: [],
    showPost: null,
    savedPosts: [],
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

export const getPostById = createAsyncThunk(
    'posts/getPostById',
    async (id: string , { rejectWithValue }) => {
        const toastId = toast.info('Fetching post details...');
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/post/${id}`); // Adjust the URL as needed
            toast.success('Post fetched successfully');
            return response.data.post; // Assuming the API returns an object with a 'post' field
        } catch (error) {
            toast.error('Failed to fetch post details');
            const err = error as { status : number , response: { data: { error: string } } };
            return rejectWithValue(err.response?.data?.error || 'Failed to fetch post');
        } finally {
            toast.dismiss(toastId);
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
        setSavedPosts: (state, action ) => {
            state.savedPosts = [ ...state.savedPosts, action.payload ];
        }
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
            })
            .addCase(getPostById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.loading = false;
                state.showPost = action.payload; // Assuming the API returns an object with a 'post' field
            })
            .addCase(getPostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // Ensure payload is a string
            });
    },
})

export const { setPosts, setLoading, setError } = postsSlice.actions;
export const selectPosts = (state: { posts: PostsState }) => state.posts.posts;
export const selectPostsLoading = (state: { posts: PostsState }) => state.posts.loading;
export const selectPostsError = (state: { posts: PostsState }) => state.posts.error;
export const selectShowPost = (state: { posts: PostsState }) => state.posts.showPost;

export default postsSlice.reducer;