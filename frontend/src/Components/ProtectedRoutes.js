import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProtectedRoutes = () => {
    const {userInfo} = useSelector((state) => state.userLogin);
  return (
    <>
        {userInfo && userInfo.token ? <Outlet /> : <Navigate to = '/login'/>}
    </>
  )
}

export default ProtectedRoutes