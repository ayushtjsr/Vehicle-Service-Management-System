import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Componenets from "./pages/Componenets";
import Vehicles from "./pages/Vehicles";
import Repairs from "./pages/Repairs";
import Revenue from "./pages/Revenue";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/components",
        element: <Componenets />,
      },
      {
        path: "/vehicles",
        element: <Vehicles />,
      },
      {
        path: "/repairs",
        element: <Repairs />,
      },
      {
        path: "/revenue",
        element: <Revenue />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
    </>
  );
}

export default App;
