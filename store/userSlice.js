import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    userInfo: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
    social: {
        following: {
            id: [],
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
            id: [],
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

export const fetchFollowers=createAsyncThunk(
    'user/fetchFollowers',
    async(_,{getState,rejectWithValue})=>{

    }
)

export const followUser=createAsyncThunk(
    "user/follow",
    async(uid,{getState,rejectWithValue})=>{
        try{
          const result=await axios.post(`http://localhost:3000/user/follow/${uid}`,
                {
                    uid: uid,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'Application/json'
                    },
                })
                console.log('in async thunk result of fetching: ',result.data);
            return result.data.data;
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
)
export const unFollowUser=createAsyncThunk(
    "user/unfollow",
    async(_,{getState,rejectWithValue})=>{
        try{
            const result=await axios.delete(`http://localhost:3000/user/follow/${uid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log('unfollow in asyn thunk :',result.data);
                return 
        }catch(err){
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
          
    }
})

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;