import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages';

function App() {
  return (
    <main className="container mx-auto h-screen">
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </main>
  );
}

export default App;
