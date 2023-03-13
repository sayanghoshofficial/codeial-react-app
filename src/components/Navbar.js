import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchUsers } from '../api';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';

export const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  useEffect(()=>{
    const fetchUsers = async () =>{
      const response = await searchUsers(searchText);

      if(response.success){
        setResults(response.data.users);
      }
    };
    if(searchText.length > 2){
      fetchUsers();
      // if(fetchUsers){
        // setSearchText('');
      //   setResults([]);
      // }
     
    }else{
      setResults([]);
    }
   
  },[searchText]);

  const handledSelectUser = () =>{
    setSearchText('');
    setResults([]);
  }

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/639/639375.png"
          alt="search icon"
        />
        <input
          placeholder="Search Users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                  onClick={handledSelectUser}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      alt="user DP"
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                alt="DP"
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}
        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log Out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
