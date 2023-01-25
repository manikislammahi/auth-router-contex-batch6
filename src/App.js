import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layout/Main';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoutes from './routes/PrivateRoutes';
import Orders from './components/Orders';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        { path: '/', element: <PrivateRoutes><Home /></PrivateRoutes> },
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login /> },
        { path: '/orders', element: <PrivateRoutes><Orders /></PrivateRoutes> },
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
