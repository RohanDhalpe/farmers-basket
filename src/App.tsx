import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './modules/Login';
import Signup from './modules/Signup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewProducts from './pages/ViewProducts';
import AdminDashBoard from './pages/AdminPage';
import  Home  from './modules/Home';
import ViewUsers from './pages/ViewUsers';
import ViewOrders from './pages/ViewOrders';
import UserPage from './pages/UserPage';
import BuyProducts from './pages/BuyProduct';
import Error from './modules/Errror';

const queryClient=new QueryClient();

function App() {
    const router = createBrowserRouter([
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/login",
            element: <Login />
        }, 
        {
            path: "/",
            element:  <Home/>
        },
        {
            path: "/admin",
            element:  <AdminDashBoard/>
        },
        {
            path:"/viewproducts",
            element:<ViewProducts onProductCountChange={() => {}} />

        },
        {
            path:"/getusers",
            element:<ViewUsers/>
        },
        {
            path:"/getorders",
            element:<ViewOrders/>
        },
        {
            path:"/userpage",
            element:<UserPage/>
        },
        {
            path:"/buyproduct",
            element:<BuyProducts/>
        },
        {
            path:"*",
            element:<Error/>
        },

    ])
    return (
        <QueryClientProvider client={queryClient}>
        <div className="App">
            <RouterProvider router={router} />
        </div>
        </QueryClientProvider>
    );
}

export default App;