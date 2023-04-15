
import axios from "axios";
import { SERVER } from "../store";

export const getInterest=()=>async(dispatch)=>{
   
    try{
        dispatch({type:"GetInterestRequest"})
   

        const {data}=await axios.get(`${SERVER}/interest`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
           })


        dispatch({type:"GetInterestSuccess",payload:data})

    } catch (err) {

        dispatch({type:"GetInterestFailure",payload:err.response.data.message})

    }

}

// export const createInterest=createAsyncThunk('interest/create',async(obj,{rejectWithValue})=>{
    
    //     try{
//         const {data}=await axios.post(`${SERVER}/interest/create`,obj,{
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             withCredentials:true
//            })
        
//            return data;

//     }catch(err){
//         console.log(err);

//          return rejectWithValue(err.response.data.message)

//     }
    
  
// })
    export const addInterest=(interestId)=>async(dispatch)=>{
       
        try{
            dispatch({type:"AddInterestRequest"})
       
    
            const {data}=await axios.post(`${SERVER}/interest/add`,{interestId},{
                            headers:{
                                "Content-Type":"application/json"
                            },
                            withCredentials:true
                           })
    
            dispatch({type:"AddInterestSuccess",payload:data})
    
        } catch (err) {
    
            dispatch({type:"AddInterestFailure",payload:err.response.data.message})
    
        }
    
    }

export const findPeople=(keyword="",category="")=>async(dispatch)=>{
   
    try{
        dispatch({type:"FindPeopleRequest"})
   

        const {data}=await axios.get(`${SERVER}/interest/find?keyword=${keyword}&category=${category}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
           })


        dispatch({type:"FindPeopleSuccess",payload:data})

    } catch (err) {

        dispatch({type:"FindPeopleFailure",payload:err.response.data.message})

    }

}
export const HelloUser=(id)=>async(dispatch)=>{
   
    try{
        dispatch({type:"HelloRequest"})
   

        const {data}=await axios.get(`${SERVER}/auth/hello/${id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
           })


        dispatch({type:"HelloSuccess",payload:data})

    } catch (err) {

        dispatch({type:"HelloFailure",payload:err.response.data.message})

    }

}



export const showFriends=()=>async(dispatch)=>{
   
    try {
        dispatch({
          type: "ShowFriendRequest",
        });
  
        const { data } = await axios.get(`${SERVER}/auth/friend-req`,{
            withCredentials:true
        });
       
        dispatch({
          type: "ShowFriendSuccess",
          payload: data
          ,
        });
      } catch (error) {
        dispatch({
          type: "ShowFriendFailure",
          payload: error.response.data.message,
        });
      }
}

export const AcceptFriends=(id,action)=>async(dispatch)=>{
   
    try {
        dispatch({
          type: "FriendsAcceptRequest",
        });
  
        const { data } = await axios.post(`${SERVER}/auth/accept/${id}`,{action},{
            withCredentials:true
        });
        console.log(data);
        dispatch({
          type: "FriendsAcceptSuccess",
          payload: data
          ,
        });
      } catch (error) {
        dispatch({
          type: "FriendsAcceptFailure",
          payload: error.response.data.message,
        });
      }
}



export const removeInterest=(id)=>async(dispatch)=>{
   
    try{
        dispatch({type:"RemoveInterestRequest"})
       
         

        const {data}=await axios.delete(`${SERVER}/auth/removeinterest?id=${id}`,{
            withCredentials:true
        })

 
        dispatch({type:"RemoveInterestSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"RemoveInterestFailure",payload:err.response.data.message})

    }

}