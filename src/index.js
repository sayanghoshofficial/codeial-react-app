import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from 'react-toast-notifications';
import './styles/index.css';
import { App } from './components';
import { AuthProvider , PostsProvider} from './providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
    <React.StrictMode>
      <AuthProvider>
        <PostsProvider>
        <App />
        </PostsProvider>
      </AuthProvider>
    </React.StrictMode>
  </ToastProvider>
);
