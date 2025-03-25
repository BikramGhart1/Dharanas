import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    userInfo: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
    social: {
        following: {
            users: [],
            pagination: {
                page: 1,
                limit: 10,
                total: 0,
                hasMore: true
            },
            status: 'idle',
            error: null,
        },
        followers: {
            users: [],
            pagination: {
                page: 1,
                limit: 10,
                total: 0,
                hasMore: true
            },
            status: 'idle',
            error: null,
        },
    }
}

export const fetchFollowers = createAsyncThunk(
    'user/fetchFollowers',
    async (_, { getState, rejectWithValue }) => {
        try {
            const {limit,page}=getState().user.social.followers.pagination;
            const token=getState().user.token;
            const followersRes = await axios.get(`http://localhost:3000/user/showFollowers?page=${page}&limit=${limit}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
            console.log('followers data in async thunk: ',followersRes.data);
            return followersRes.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const fetchFollowings = createAsyncThunk(
    'user/fetchFollowings',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token=getState().user.token;
            const followingsRes = await axios.get('http://localhost:3000/user/showFollowings',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
            console.log('followings data in async thunk: ',followingsRes.data);
            return followingsRes.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const followUser = createAsyncThunk(
    "user/follow",
    async (uid, { getState, rejectWithValue }) => {
        try {
            const result = await axios.post(`http://localhost:3000/user/follow/${uid}`,
                {
                    uid: uid,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'Application/json'
                    },
                })
            console.log('in async thunk result of fetching: ', result.data);
            return result.data.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
export const unFollowUser = createAsyncThunk(
    "user/unfollow",
    async (_, { getState, rejectWithValue }) => {
        try {
            const result = await axios.delete(`http://localhost:3000/user/follow/${uid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            console.log('unfollow in asyn thunk :', result.data);
            return
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (_, { getState, rejectWithValue, dispatch }) => {
        try {
            const token = getState().user.token || localStorage.getItem('token');
            if (!token) {
                return rejectWithValue("No token found");
            }
            const response = await axios.get('http://localhost:3000/user/userDetails', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.user;
        } catch (err) {
            if (err.response && err.response.status === 401) {
                dispatch(logout());
                return rejectWithValue("Token expired! please login again");
            }
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
)
export const changepfp = createAsyncThunk(
    "user/changepfp",
    async (formData, { getState, rejectWithValue }) => {
        try {
            const uid = getState().user.userInfo.uid;
            const token = getState().user.token || localStorage.getItem('token');

            if (!token) {
                return rejectWithValue('No token found');
            }
            const response = await axios.post(`http://localhost:3000/user/changepfp/${uid}`,

                formData
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'multipart/form-data',
                    },

                })
            if (response.status !== 200) {
                throw new Error("Failed to update the profile picture");
            }
            console.log('profile picture response data ', response.data);
            return response.data.pfp;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (formData, { getState, rejectWithValue }) => {
        try {
            const uid = getState().user.userInfo.uid;
            const token = getState().user.token || localStorage.getItem('token');
            if (!token) {
                return rejectWithValue("No token found");
            }
            const response = await axios.post(`http://localhost:3000/user/editProfile/${uid}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                },
            )
            if (response.status !== 200) {
                throw new Error("Failed to update the profile");
            }
            console.log("profile updation response data: ", response.data)
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logout: (state, action) => {

            localStorage.removeItem('token');
            state.userInfo = null;
            state.token = null;
            state.status = null;
            state.error = null;
            state.social = null;
        },
        incrementFollowersPage:(state,action)=>{
            state.social.followers.pagination.page+=1;
        },
        incrementFollowingsPage:(state,action)=>{
            state.social.following.pagination.page+=1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'completed';
                console.log(action.payload);
                state.userInfo = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(changepfp.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(changepfp.fulfilled, (state, action) => {
                state.status = 'completed';
                state.userInfo = { ...state.userInfo, profile_picture: action.payload };
            })
            .addCase(changepfp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(updateProfile.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'completed';
                state.userInfo = { ...state.userInfo, username: action.payload.username, bio: action.payload.bio };
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            //Fetch followers
            .addCase(fetchFollowers.pending,(state,action)=>{
                state.social.followers.status='loading';
            })
            .addCase(fetchFollowers.fulfilled,(state,action)=>{
                state.social.followers.status='successful';
                state.social.followers.users=action.payload.data;
                state.social.followers.pagination.total=action.payload.total_followers;
            })
            .addCase(fetchFollowers.rejected,(state,action)=>{
                state.social.followers.status='failed';
                state.social.followers.error=action.payload;
            })

            //fetch followings
            .addCase(fetchFollowings.pending,(state,action)=>{
                state.social.following.status='loading';
            })
            .addCase(fetchFollowings.fulfilled,(state,action)=>{
                state.social.following.status='successful';
                state.social.following.users=action.payload.data;
                state.social.following.pagination.total=action.payload.total_followings;
            })
            .addCase(fetchFollowings.rejected,(state,action)=>{
                state.social.following.status='failed';
                state.social.following.error=action.payload;
            })

    }
})

export const { loginSuccess, logout, incrementFollowersPage, incrementFollowingsPage } = userSlice.actions;
export default userSlice.reducer;