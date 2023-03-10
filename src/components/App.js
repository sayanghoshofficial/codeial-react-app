import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getPosts } from '../api';
import { useAuth } from '../hooks';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';

const About = () => {
  return <h1>About</h1>;
};
const UserInfo = () => {
  return <h1>User</h1>;
};
const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }
  //     setLoading(false);
  //   };
  //   fetchPosts();
  // }, []);

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

          <Route exact path="/about" element={<About />} />

          <Route exact path="/user/ksdh" element={<UserInfo />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
