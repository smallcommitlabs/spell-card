import React from 'react';
import { Button } from 'reactstrap';
import SpellCard from '../components/SpellCard';
import { logout } from '../redux/auth/thunks/logout';
import { useAppDispatch } from '../redux/store';

const Game = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      style={{ height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <h1>Spell Card Logo</h1>
      <SpellCard />
      <Button color={'primary'} className={'mt-3'} onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </div>
  );
};
export default Game;
