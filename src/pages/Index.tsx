import { useState } from 'react';
import EnterScreen from '@/components/EnterScreen';
import Scene from '@/components/Scene';

const Index = () => {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {!entered && <EnterScreen onEnter={() => setEntered(true)} />}
      <Scene />
    </>
  );
};

export default Index;
