import { lazy, Suspense, useState } from 'react';
import EnterScreen from '@/components/EnterScreen';

const Scene = lazy(() => import('@/components/Scene'));

const Index = () => {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <Suspense fallback={
        <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#1a1410' }}>
          <img
            src="/museum-wall-clean.jpg"
            alt=""
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      }>
        <Scene />
      </Suspense>
      {!entered && <EnterScreen onEnter={() => setEntered(true)} />}
    </>
  );
};

export default Index;
