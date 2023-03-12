import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import {
  addFriends,
  fetchUserProfile,
  fetchFriends,
  removeFriends,
} from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [reuqestInProgress, setReuqestInProgress] = useState(false);
  const [isFriend, setIsFriend] = useState(true);
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
    const checkIfUserHasAFriend = async () => {
      const response = await fetchFriends();
      const friends = response.data.friends;
      const friendIds = friends.map((friend) => friend.to_user._id);
      const index = friendIds.indexOf(userId);

      if (index !== -1) {
        setIsFriend(true);
        return true;
      } else {
        setIsFriend(false);
        return false;
      }
    };
    getUser();
    checkIfUserHasAFriend();
  }, [userId, nevigate, addToast]);

  if (loading) {
    return <Loader />;
  }

  const handledRemoveFriendOnClick = async () => {
    setReuqestInProgress(true);
    const response = await removeFriends(userId);
    if (response.success) {
      addToast('Friends removed Successfully! ...', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setReuqestInProgress(false);
    setIsFriend(false);
  };

  const handledAddFriendOnClick = async () => {
    setReuqestInProgress(true);
    const response = await addFriends(userId);

    if (response.success) {
      addToast('Friends added Successfully! ...', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setReuqestInProgress(false);
    setIsFriend(true);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="user pic"
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
        {isFriend ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handledRemoveFriendOnClick}
          >
            {reuqestInProgress ? 'Removing friend..' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handledAddFriendOnClick}
            disabled={reuqestInProgress}
          >
            {reuqestInProgress ? 'Adding friend..' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
