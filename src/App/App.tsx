import ErrorBoundary from '../components/error-boundary';
import Game from '../components/game';
import './App.css';

function App() {
  return (
    <main>
      <ErrorBoundary>
        <Game />
      </ErrorBoundary>
    </main>
  );
}

export default App;
