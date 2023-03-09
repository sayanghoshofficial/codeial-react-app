import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';

export const Navbar = () => {
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
      <div className={styles.rightNav}>
        <div className={styles.user}>
          <a href="/">
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className={styles.userDp}
            />
          </a>
          <span>Sayan</span>
        </div>
        <div className={styles.navLinks}>
          <ul>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/logout">Log Out</Link>
            </li>
            <li>
              <Link href="/">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
