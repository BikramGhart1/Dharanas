import {createSlice,createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState={
    userInfo:null,
    token:localStorage.getItem('token')||null,
    status:'idle',
    error:null
}
export const fetchUser= createAsyncThunk(
    "user/fetchUser",
    async(_,{getState,rejectWithValue})=>{
        try{
          const token=getState().user.token || localStorage.getItem('token');
          if(!token){
            return rejectWithValue("No token found");
          }
          const response=await axios.get('http://localhost:3000/user/userDetails',{
            headers:{
                Authorization: `Bearer ${token}`
            }
          })
          return response.data.user;
        }catch(err){
            return rejectedWithValue(err.response?.data);
        }
    }
)
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        logout:(state,action)=>{
          localStorage.removeItem('token');
          state.token=null;
          state.userInfo=null;
          user.status=null;
          user.error=null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.status='loading';
        })        
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.status='completed';
            state.userInfo=action.payload;
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.payload;
        })
    }
})