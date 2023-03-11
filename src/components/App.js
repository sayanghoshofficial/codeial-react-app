import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../hooks';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  console.log("Auth",auth);
  if (auth.user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

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
          <Route exact path="/register" element={<Signup />} />
          <Route
            exact
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/user/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
