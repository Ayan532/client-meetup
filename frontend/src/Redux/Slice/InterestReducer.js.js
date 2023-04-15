// import { createSlice } from "@reduxjs/toolkit";
// import { addInterest, createInterest, findPeople, getInterest } from "../Action/InterestAction";

import { createReducer } from "@reduxjs/toolkit";

// const interestSlice=createSlice({
//     name:"interest",
//     initialState:{
//         loading:false,
//         interest:[],
        

//     },
//     extraReducers:{
//         [getInterest.pending]:(state)=>{
//             state.loading=true;
//         },
//         [getInterest.fulfilled]:(state,action)=>{
//             state.loading=false;
//             state.interest=action.payload.interests
        
//         },
//         [getInterest.rejected]:(state,action)=>{
//             state.loading=false;
//             state.error=action.payload;
//         },
//         [createInterest.pending]:(state)=>{
//             state.loading=true;
//         },
//         [createInterest.fulfilled]:(state,action)=>{
//             state.loading=false;
//             state.message=action.payload.message
        
//         },
//         [createInterest.rejected]:(state,action)=>{
//             state.loading=false;
//             state.error=action.payload;
//         },
//         [addInterest.pending]:(state)=>{
//             state.loading=true;
//         },
//         [addInterest.fulfilled]:(state,action)=>{
//             state.loading=false;
//             state.message=action.payload.message
        
//         },
//         [addInterest.rejected]:(state,action)=>{
//             state.loading=false;
//             state.error=action.payload;
//         },
//         [findPeople.pending]:(state)=>{
//             state.loading=true;
//         },
//         [findPeople.fulfilled]:(state,action)=>{
//             state.loading=false;
//             state.people=action.payload.people
        
//         },
//         [findPeople.rejected]:(state,action)=>{
//             state.loading=false;
//             state.error=action.payload;
//         }

//     }
// })

// export default interestSlice.reducer


export const interestReducer=createReducer({interest:[],people:[]},{
   
    GetInterestRequest:(state)=>{
        state.loading=true;
    },
    GetInterestSuccess:(state,action)=>{
        state.loading=false;
        state.interest=action.payload.interests
    },
    GetInterestFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    AddInterestRequest:(state)=>{
        state.loading=true;
    },
    AddInterestSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload.message
    },
    AddInterestFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    FindPeopleRequest:(state)=>{
        state.loading=true;

    },
    FindPeopleSuccess:(state,action)=>{
        state.loading=false;
        state.interest=action.payload.interest
        state.people=action.payload.user
    },
    FindPeopleFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.people=[]
        state.interest=[]

    },

    clearError:(state)=>{
        state.error=null
    },
    clearMessage:(state)=>{
        state.message=null
    }
     
})
export const friendsReducer=createReducer({friends:[]},{
   
      HelloRequest: (state) => {
        state.loading = true;
      },
      HelloSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      HelloFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      ShowFriendRequest: (state) => {
        state.loading = true;
      },
      ShowFriendSuccess: (state, action) => {
        state.loading = false;
        state.friends = action.payload.friends;
      },
      ShowFriendFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      FriendsAcceptRequest: (state) => {
        state.loading = true;
      },
      FriendsAcceptSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      },
      FriendsAcceptFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  
    clearError:(state)=>{
        state.error=null
    },
    clearMessage:(state)=>{
        state.message=null
    }
     
})