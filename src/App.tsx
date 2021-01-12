import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrateAuth } from './redux/auth/thunks/hydrateAuth';
import { RootState, useAppDispatch } from './redux/store';
import MainRoutes from './routes/MainRoutes';
import PublicRoutes from './routes/PublicRoutes';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const authSelector = (state: RootState) => state.auth;

  const { isAuthenticated, resolvingAuthState } = useSelector(authSelector);

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  return (
    <>
      {resolvingAuthState ? (
        <p>loading...</p>
      ) : (
        <Router>{isAuthenticated ? <MainRoutes /> : <PublicRoutes />}</Router>
      )}
    </>
  );
};

export default App;
