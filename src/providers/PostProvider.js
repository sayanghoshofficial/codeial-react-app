import { createContext } from 'react';
import { useProvidePosts } from '../hooks';

const initialState = {
  post: [],
  loading: true,
  addPostToState: ()=>{},
};
export const PostsContext = createContext(initialState);

export const PostsProvider = ({ children }) => {
  const posts = useProvidePosts();

  return <AuthContext.Provider value={posts}>{children}</AuthContext.Provider>;
};
