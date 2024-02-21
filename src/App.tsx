// Components
import { Teacher } from './pages/Teacher'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Styles
import './styles/App.css'

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Teacher />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}