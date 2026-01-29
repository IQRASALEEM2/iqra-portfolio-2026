import React, { useLayoutEffect } from 'react';
import { isAdminLoggedIn } from '../utils/adminAuth';
import { navigate } from '../router/navigation';
import Login from '../pages/Login';

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authed = isAdminLoggedIn();

  // Redirect happens before paint (smooth + avoids stuck state)
  useLayoutEffect(() => {
    if (!authed) navigate('/login', { replace: true });
  }, [authed]);

  // Always show login UI while redirecting (no blank/black screen)
  if (!authed) return <Login />;

  return <>{children}</>;
};

export default PrivateRoute;

