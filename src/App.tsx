import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';
import PublicRoutes from './routes/PublicRoutes';
import { AuthClient } from './util/AuthClient';

const App: React.FC = () => {
  const isAuth = AuthClient.isAuth();

  return <Router>{isAuth ? <MainRoutes /> : <PublicRoutes />}</Router>;
};

export default App;
