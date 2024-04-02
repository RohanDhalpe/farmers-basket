import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewProducts from './components/ViewProducts';
import ProductForm from './components/ProductForm';
import  Home  from './components/Home';

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
            path: "/createproduct",
            element:  <ProductForm/>
        },
        {
            path:"/viewproducts",
            element:<ViewProducts/>
        }
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