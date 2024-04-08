import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './modules/Login';
import Signup from './modules/Signup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewProducts from './pages/ViewProducts';
import AdminDashBoard from './pages/AdminPage';
import ViewUsers from '././pages/ViewUsers';
import ViewOrders from './pages/ViewOrders';
import UserPage from './pages/UserPage';
import BuyProducts from './pages/BuyProductPage';
import Error from './modules/Errror';
import UserOrders from './pages/UserOrders';
import { Provider } from 'react-redux';
import store from './api/store';
import Protected from './modules/AuthLayout';
import Landing from './pages/LandingPage';
import Cart from './pages/CartPage';
import Orderconfirm from './modules/Orderconfirm';
import Footer from './pages/Footer';



const queryClient = new QueryClient();

function App() {
    const router = createBrowserRouter([
        {
            path: "/signup",
            element:
                <Protected authentication={false}>
                    <Signup />
                </Protected>
        },
        {
            path: "/login",
            element:
                <Protected authentication={false}>
                    <Login />
                </Protected>
        },
        {
            path: "/",
            element:
                <Protected authentication={false}>
                  <Landing/>
                </Protected>
        },
        {
            path: "/admin",
            element:
                <Protected authentication={true}>
                    <AdminDashBoard />
                </Protected>
        },
        {
            path: "/viewproducts",
            element: <Protected authentication={true}>
                      <ViewProducts />
                     </Protected>
        },
        {
            path: "/getusers",
            element: <Protected authentication={true}>
                      <ViewUsers />
                     </Protected>
        },
        {
            path: "/getorders",
            element: <Protected authentication={true}><ViewOrders /></Protected>
        },
        {
            path: "/userpage",
            element: <Protected authentication={true}><UserPage /></Protected>
        },
        {
            path: "/buyproduct",
            element: <Protected authentication={true}><BuyProducts /></Protected>
        },
        {
            path: "*",
            element: <Protected authentication={true}><Error /></Protected>
        },
        {
            path: "/myorders",
            element: <Protected authentication={true}><UserOrders /></Protected>
        },
        {
            path: "/mycart",
            element:  <Protected authentication={true}><Cart/></Protected>
        },
        {
            path: "/confirmorder",
            element:  <Protected authentication={true}><Orderconfirm/></Protected>
        },
        {
            path: "/footer",
            element: <Protected authentication={true}><Footer/></Protected>
        },

    ])
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <RouterProvider router={router} />
                </div>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
