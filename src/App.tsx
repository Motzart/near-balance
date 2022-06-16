import React, { useContext, useEffect } from 'react';
import { appStore, onAppMount } from '~state/app';
import { NavBar } from '~components/navBar';
import { Content } from '~components/content';
import { useUsersBalance } from '~hooks/useUsersBalance';

function App() {
  const { dispatch } = useContext(appStore);

  const onMount = () => {
    dispatch(onAppMount());
  };

  useEffect(onMount, []);

  const balances = useUsersBalance();

  return (
    <>
      <NavBar />
      {balances && <Content data={balances} />}
    </>
  );
}

export default App;
