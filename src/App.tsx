import GlobalStyle from './globalStyles.ts';

import { Provider } from 'react-redux';
import store from './core/store/index.ts';

import { RouterProvider } from 'react-router-dom';
import router from './core/routes/router.tsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Provider store={store}>
            <GlobalStyle />
            <RouterProvider router={router} />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme="colored"
            />
        </Provider>
    );
}

export default App;
