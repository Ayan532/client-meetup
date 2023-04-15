
import axios from "axios";
import { toast } from "react-hot-toast";
import { SERVER } from "../store";


export const loginUser=({email,password})=>async(dispatch)=>{
   
    try{
        dispatch({type:"LoginRequest"})


        const {data}=await axios.post(`${SERVER}/auth/login`,{email,password},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })


        dispatch({type:"LoginSuccess",payload:data})

    } catch (err) {

        dispatch({type:"LoginFailure",payload:err.response.data.message})

    }

}

export const LoadUser=()=>async(dispatch)=>{
   
    try{
        dispatch({type:"LoadUserRequest"})


        const {data}=await axios.get(`${SERVER}/auth/me`,{
            withCredentials:true
        })

        dispatch({type:"LoadUserSuccess",payload:data})

    } catch (err) {

        dispatch({type:"LoadUserFailure",payload:err.response.data.message})

    }

}

export const LogoutUser=()=>async(dispatch)=>{
   
    try{
        dispatch({type:"LogoutUserRequest"})


        const {data}=await axios.get(`${SERVER}/auth/logout`,{
            withCredentials:true
        })

     console.log(data);
        dispatch({type:"LogoutUserSuccess",payload:data})

    } catch (err) {

        dispatch({type:"LogoutUserFailure",payload:err.response.data.message})

    }

}

export const UserInterest=(userId)=>async(dispatch)=>{

    try{
        dispatch({type:"UserInterestRequest"})


        const {data}=await axios.get(`${SERVER}/interest/${userId}`,{
    
            withCredentials:true
        })


        dispatch({type:"UserInterestSuccess",payload:data})

    } catch (err) {

        dispatch({type:"UserInterestFailure",payload:err.response.data.message})

    }
  

}
export const myFriends=(id)=>async(dispatch)=>{

    try{
        dispatch({type:"MyFriendRequest"})


        const {data}=await axios.get(`${SERVER}/auth/me/friends/${id}`,{
    
            withCredentials:true
        })


        dispatch({type:"MyFriendSuccess",payload:data})

    } catch (err) {

        dispatch({type:"MyFriendFailure",payload:err.response.data.message})

    }
  

}
export const RegisterUser=(formData)=>async(dispatch)=>{

    try{
        dispatch({type:"RegisterUserRequest"})


        const {data}=await axios.post(`${SERVER}/auth/register`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })


        dispatch({type:"RegisterUserSuccess",payload:data})

    } catch (err) {

        dispatch({type:"RegisterUserFailure",payload:err.response.data.message})

    }
  

}


export const changePassword=(oldPassword,newPassword)=>async(dispatch)=>{

    try{
        dispatch({type:"ChangePasswordRequest"})


        const {data}=await axios.put(`${SERVER}/auth/me/password/update`,{oldPassword,newPassword},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
     
        dispatch({type:"ChangePasswordSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"ChangePasswordFailure",payload:err.response.data.message})

    }
  

}


export const updateProfile=(name,email)=>async(dispatch)=>{

    try{
        dispatch({type:"UpdateProfileRequest"})


        const {data}=await axios.put(`${SERVER}/auth/me/update`,{name,email},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })

    
        dispatch({type:"UpdateProfileSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"UpdateProfileFailure",payload:err.response.data.message})

    }
  

}





export const updateProfilePicture=(formData)=>async(dispatch)=>{

    try{
        dispatch({type:"UpdateProfilePictureRequest"})


        const {data}=await axios.put(`${SERVER}/auth/me/profilepicture`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })

     
        dispatch({type:"UpdateProfilePictureSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"UpdateProfilePictureFailure",payload:err.response.data.message})

    }
  

}


//Forget Password
export const resetPassword=(token,password,confirmPassword)=>async(dispatch)=>{

    try{
        dispatch({type:"ResetForgetPasswordRequest"})


        const {data}=await axios.put(`${SERVER}/auth/reset-password/${token}`,{password,confirmPassword},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })

     
        dispatch({type:"ResetForgetPasswordSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"ResetForgetPasswordFailure",payload:err.response.data.message})

    }
  

}
export const forgetPassword=(email)=>async(dispatch)=>{

    try{
        dispatch({type:"ForgetPasswordRequest"})


        const {data}=await axios.post(`${SERVER}/auth/forget-password`,{email},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })

     
        dispatch({type:"ForgetPasswordSuccess",payload:data.message})

    } catch (err) {

        dispatch({type:"ForgetPasswordFailure",payload:err.response.data.message})

    }
  

}