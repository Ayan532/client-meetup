import { createReducer } from "@reduxjs/toolkit";

export const ConversationReducer=createReducer({conversations:[]},{
   
    GetConversationRequest: (state) => {
      state.loading = true;
    },
    GetConversationSuccess: (state, action) => {
      state.loading = false;
      state.conversations = action.payload.conversations;
    },
    GetConversationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CreateConversationRequest: (state) => {
      state.loading = true;
    },
    CreateConversationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    CreateConversationFailure: (state, action) => {
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