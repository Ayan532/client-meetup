import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Navbar from "./Componets/layouts/Navbar/Navbar";
import ProtectedRoute from "./Componets/layouts/Route/ProtectedRoute";
import ForgetPassword from "./Componets/pages/Auth/ForgetPassword";
import Login from "./Componets/pages/Auth/Login";
import Register from "./Componets/pages/Auth/Register";
import ResetPassword from "./Componets/pages/Auth/ResetPassword";
import Conversation from "./Componets/pages/Conversation/Conversation";
import Filter from "./Componets/pages/filter/Filter";
import Home from "./Componets/pages/Home/Home";
import ManageInterest from "./Componets/pages/Mange Interest/ManageInterest";
import ChangePassword from "./Componets/pages/Profile/ChangePassword";
import Profile from "./Componets/pages/Profile/Profile";
import UpdateProfile from "./Componets/pages/Profile/UpdateProfile";
import { LoadUser } from "./Redux/Action/AuthAction";

function App() {
   const dispatch=useDispatch()
   const {user,isAuthenticated,error,message,loading}=useSelector(state=>state.auth)

   useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }
     
  }, [dispatch,error,message])
  useEffect(() => {
   dispatch(LoadUser())
  }, [dispatch])
  

  const Layout=()=>{
    return(
      <div>
      <Toaster/>
      <Navbar user={user} isAuthenticated={isAuthenticated}/>
      <Outlet/>
      {/* <Footer/> */}
      </div>
    )
  }

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute isAuthenticated={isAuthenticated}><Layout/></ProtectedRoute>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/filter",
          element:<Filter/>
        },
        {
          path:"/profile/:id",
          element:<Profile/>
        },
        {
          path:"/manage-interest",
          element:<ManageInterest/>
        },
        {
          path:"/conversation",
          element:<Conversation/>
        },
        {
          path:"/changepassword",
          element:<ChangePassword/>
        },
        {
          path:"/updateprofile",
          element:<UpdateProfile/>
        },
      
      ]
    },
        {
          path:"/login",
         element: <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/"><Login/></ProtectedRoute> 
        },
        {
          path:"/register",
         element: <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/"><Register/></ProtectedRoute> 
        },
        {
          path:"/forget-password",
         element: <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/"><ForgetPassword/></ProtectedRoute> 
        },
        {
          path:"/reset-password/:token",
         element: <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/"><ResetPassword/></ProtectedRoute> 
        }
  ]);
 

  return (
    <RouterProvider router={router} />
  )
}

export default App
