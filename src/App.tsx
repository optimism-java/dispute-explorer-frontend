import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { CreditDetail, Dashboard, GameDetail, Games } from './pages';

function App() {
  return (
    <div className="bg-background-light font-dogica">
      <header>
        <Header />
      </header>
      <main className="container mx-auto pt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:gameId" element={<GameDetail />} />
          <Route path="/credits/:addr" element={<CreditDetail />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
