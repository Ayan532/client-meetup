import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoute = ({isAuthenticated,children,redirect='/login',redirectAdmin='/profile/:id',isAdmin,adminRoute}) => {


    if(!isAuthenticated){
        return <Navigate to={redirect}/>
    }

    if(adminRoute && !isAdmin){
        return <Navigate to={redirectAdmin}/>
    }

  return children?children : <Outlet/>
}

export default ProtectedRoute