import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

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
        }
    ])
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;