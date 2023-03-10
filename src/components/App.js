import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home posts={[]} />} />

          <Route exact path="/login" element={<Login />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
