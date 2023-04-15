import { configureStore } from "@reduxjs/toolkit";
import { ConversationReducer } from "./Slice/ConversationReducer.js";
import { friendsReducer, interestReducer } from "./Slice/InterestReducer.js";
import { profileReducer, userInterestReducer, userReducer } from "./Slice/UserReducer";


const store= configureStore({
    reducer:{
        auth:userReducer,
        interest:interestReducer,
        userInterest:userInterestReducer,
        friends:friendsReducer,
        conversations:ConversationReducer,
        profile:profileReducer
    }
})
export const SERVER='https://api-meetup.vercel.app/api/v1'

export default store;