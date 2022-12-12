import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'App.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { Routes } from './routes/Routes';
import { store } from './redux/store';
import { ReactReduxFirebaseContextProvider } from './context/ReactReduxFirebaseContextProvider';

export const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseContextProvider>
        <ToastContainer position="bottom-center" />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ReactReduxFirebaseContextProvider>
    </Provider>
  );
};
