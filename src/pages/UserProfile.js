import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { fetchUserProfile } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const nevigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        return nevigate('/');
      }
      setLoading(false);
    };
    getUser();
  }, [userId, nevigate, addToast]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserHasAFriend = () => {
    const friends = auth.user.friendships;

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserHasAFriend() ? (
          <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}>Add Friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
