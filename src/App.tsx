// Components
import { Teacher } from './pages/Teacher'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Styles
import './styles/App.css'
import { Manager } from './pages/Manager';

export const App = () => {
  const apiUrlBase = "https://gest-in-back-end.vercel.app";

  const router = createBrowserRouter([
    {
      path: "/teacher",
      element: <Teacher />,
    },
    {
      path: "/manager",
      element: <Manager apiBase={apiUrlBase} />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}