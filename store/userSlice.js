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
            const { limit, page, hasMore } = getState().user.social.followers.pagination;
            const token = getState().user.token;

            console.log('Has more in followers:, ', hasMore);
            if (!hasMore) {
                // Still return a consistent shape
                return {
                    data: [],
                    total_followers: getState().user.social.followers.pagination.total || 0,
                };
            }
            const followersRes = await axios.get(`https://dharanas-backend-deployment.onrender.com/user/showFollowers?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log('followers data in async thunk: ', followersRes.data);
            const data = await followersRes?.data;
            return data;
        } catch (err) {
            console.log('error in fetching followers: ', err);
            return rejectWithValue(err);
        }
    }
)

export const fetchFollowings = createAsyncThunk(
    'user/fetchFollowings',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { limit, page, hasMore } = getState().user.social.following.pagination;
            const token = getState().user.token;

            console.log('following for users triggered and hasmore: ', hasMore);
            if (!hasMore) {
                // Still return a consistent shape
                return {
                    data: [],
                    total_followers: getState().user.social.followers.pagination.total || 0,
                };
            }
            console.log('following check');
            const followingsRes = await axios.get(`https://dharanas-backend-deployment.onrender.com/user/showFollowings?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log('followings data in async thunk: ', followingsRes.data);
            const data = await followingsRes?.data;
            return data;
        } catch (err) {
            console.log('error in fetching followings: ', err);
            return rejectWithValue(err);
        }
    }
)

export const followUser = createAsyncThunk(
    "user/follow",
    async (uid, { getState, rejectWithValue }) => {
        try {
            const result = await axios.post(`https://dharanas-backend-deployment.onrender.com/user/follow/${uid}`,
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
            const result = await axios.delete(`https://dharanas-backend-deployment.onrender.com/user/follow/${uid}`,
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
            const response = await axios.get('https://dharanas-backend-deployment.onrender.com/user/userDetails', {
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
            const response = await axios.post(`https://dharanas-backend-deployment.onrender.com/user/changepfp/${uid}`,

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
            const response = await axios.post(`https://dharanas-backend-deployment.onrender.com/user/editProfile/${uid}`,
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
        incrementFollowersPage: (state, action) => {
            state.social.followers.pagination.page += 1;
        },
        incrementFollowingsPage: (state, action) => {
            state.social.following.pagination.page += 1;
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
            .addCase(fetchFollowers.pending, (state, action) => {
                state.social.followers.status = 'loading';
            })
            .addCase(fetchFollowers.fulfilled, (state, action) => {
                const payload = action?.payload;
                const total_followers = payload?.total_followers;
                const data = payload?.data ?? [];

                const currentLength = state.social.followers.users.length;
                const newFetched = data.length;
                const totalFetched = currentLength + newFetched;

                //  DO NOT update anything if there's nothing new AND hasMore is already false
                if (data.length === 0 && !state.social.followers.pagination.hasMore) {
                    state.social.followers.status = 'successful';
                    return;
                }

                state.social.followers.status = 'successful';
                state.social.followers.pagination.total = total_followers;

                state.social.followers.pagination.hasMore = totalFetched < total_followers;

                const page = state.social.followers.pagination.page;
                if (page === 1) {
                    state.social.followers.users = data; // first page, replace
                } else {
                    state.social.followers.users.push(...data); // later pages, append
                }
                console.log('Im checking if data are available in redux state', state.social.followers.users);
            })
            .addCase(fetchFollowers.rejected, (state, action) => {
                state.social.followers.status = 'failed';
                state.social.followers.error = action.payload;
            })

            //fetch followings
            .addCase(fetchFollowings.pending, (state, action) => {
                state.social.following.status = 'loading';
            })
            .addCase(fetchFollowings.fulfilled, (state, action) => {
                const payload = action?.payload;
                const total_followings = payload?.total_followings;
                const data = payload?.data ?? [];


                const currentLength = state.social.following.users.length;
                const newFetched = data.length;
                const totalFetched = currentLength + newFetched;

                //  DO NOT update anything if there's nothing new AND hasMore is already false
                if (data.length === 0 && !state.social.following.pagination.hasMore) {
                    state.social.following.status = 'successful';
                    return;
                }
                state.social.following.status = 'successful';
                // state.social.following.users = data;
                state.social.following.pagination.total = total_followings;

                state.social.following.pagination.hasMore = totalFetched < total_followings;

                const page = state.social.following.pagination.page;
                if (page === 1) {
                    state.social.following.users = data; // first page, replace
                } else {
                    state.social.following.users.push(...data); // later pages, append
                }
                console.log('Im checking if following data are available in redux state', state.social.following.users);


            })
            .addCase(fetchFollowings.rejected, (state, action) => {
                state.social.following.status = 'failed';
                state.social.following.error = action.payload;
            })

    }
})

export const { loginSuccess, logout, incrementFollowersPage, incrementFollowingsPage } = userSlice.actions;
export default userSlice.reducer;