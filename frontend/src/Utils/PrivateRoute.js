import { useContext } from 'react';
import {Outlet} from 'react-router-dom'
import { Navigate } from "react-router-dom";
import AuthContext from '../AuthContext/AuthContext';

const PrivateRoute = () =>{
    let {user}=useContext(AuthContext)

    return(
        user ? <Outlet/>:<Navigate to='/' />
    )
}
export default PrivateRoute;