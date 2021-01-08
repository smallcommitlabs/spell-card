import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import SpellCard from '../components/SpellCard';
import { AuthClient } from '../util/AuthClient';

const Game = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <h1>Spell Card Logo</h1>
    <SpellCard />
    <Button
      color={'primary'}
      className={'mt-3'}
      onClick={() => {
        AuthClient.signOut();
        window.location.reload();
      }}
    >
      Logout
    </Button>
  </div>
);
export default Game;
