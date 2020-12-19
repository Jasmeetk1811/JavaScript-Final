import React from 'react';
import PageRoutes from '../../Pages/routes';
import UserRoutes from '../../Users/routes';
import PostRoutes from '../../Posts/routes';
import ImageRoutes from '../../Images/routes';
import AuthenticationRoutes from '../../Authentication/routes';

const Routes = () => {
  return (
    <>
      <PageRoutes/>
      <UserRoutes/>
      <PostRoutes />
      <ImageRoutes/>
      <AuthenticationRoutes/>
    </>
  );
}
 
export default Routes;