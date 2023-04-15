import axios from "axios"
import { SERVER } from "../store"

export const getConversations=()=>async(dispatch)=>{

    try{
        dispatch({type:"GetConversationRequest"})


        const {data}=await axios.get(`${SERVER}/conversation`,{
         
            withCredentials:true
        })


        dispatch({type:"GetConversationSuccess",payload:data})

    } catch (err) {

        dispatch({type:"GetConversationFailure",payload:err.response.data.message})

    }
  

}
export const getMessages=(conversationId)=>async(dispatch)=>{

    try{
        dispatch({type:"GetMessageRequest"})


        const {data}=await axios.get(`${SERVER}/conversation/message/${conversationId}`,{
    
            withCredentials:true
        })


        dispatch({type:"GetMessageSuccess",payload:data})

    } catch (err) {

        dispatch({type:"GetMessageFailure",payload:err.response.data.message})

    }
}
  
export const createConversation=(senderId)=>async(dispatch)=>{

    try{
        dispatch({type:"CreateConversationRequest"})


        const {data}=await axios.post(`${SERVER}/conversation`,{senderId},{
            headers:{
                "Content-Type":"application/json"
            },
    
            withCredentials:true
        })


        dispatch({type:"CreateConversationSuccess",payload:data})

    } catch (err) {

        dispatch({type:"CreateConversationFailure",payload:err.response.data.message})

    }
  

}
// export const SendMessage=(message)=>async(dispatch)=>{

//     try{
//         dispatch({type:"SendMessageRequest"})


//         const {data}=await axios.post(`${SERVER}/conversation/message`,message,{

//             headers:{
//                 "Content-Type":"application/json"
//             },
    
    
//             withCredentials:true
//         })


//         dispatch({type:"SendMessageSuccess",payload:data})

//     } catch (err) {

//         dispatch({type:"SendMessageFailure",payload:err.response.data.message})

//     }
  

// }