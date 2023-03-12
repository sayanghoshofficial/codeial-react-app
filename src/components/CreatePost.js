import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { createPost } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();
  const posts = usePosts();

  const handledAddPostonClick = async () => {
    setAddingPost(true);

    const response = await createPost(post);

    if (response.success) {
      setPost('');
      posts.addPostToState(response.data.post);
      addToast('Post created ssuccessfully....', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handledAddPostonClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding Post...' : 'Add Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
