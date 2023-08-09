import { ErrorBoundary } from 'react-error-boundary';
import Game from '../components/game';
import { fallbackRender } from '../components/error-fallback/error-fallback';

import './App.css';

function App() {
  return (
    <main>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Game />
      </ErrorBoundary>
    </main>
  );
}

export default App;
