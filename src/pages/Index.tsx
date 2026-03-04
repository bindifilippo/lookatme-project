import { lazy, Suspense, useState } from 'react';
import EnterScreen from '@/components/EnterScreen';

const Scene = lazy(() => import('@/components/Scene'));

const Index = () => {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <Suspense fallback={
        <div className="fixed inset-0" style={{ background: 'hsl(30, 20%, 10%)' }} />
      }>
        <Scene />
      </Suspense>
      {!entered && <EnterScreen onEnter={() => setEntered(true)} />}
    </>
  );
};

export default Index;
