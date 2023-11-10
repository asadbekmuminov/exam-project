//react-router-dom
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//main layout
import MainLayout from "./layout/MainLayout";

//taostify
import "react-toastify/dist/ReactToastify.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import { authIsReady, login } from "./redux/features/shoppingSlice";
import { useEffect } from "react";

//firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

// protectedRoutes
import ProtectedRoutes from "./components/ProtectedRoutes";

// navigate
import { Navigate } from "react-router-dom";

//pages
import Login from "./pages/Login";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Home from "./pages/Home";
import CheckOut from "./pages/CheckOut";
import Orders from "./pages/Orders";
import ProductPage from "./pages/ProductPage";

//App
function App() {
  const { AuthIsReady, user } = useSelector((state) => state.globalState);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "productpage/:id",
          element: <ProductPage />,
        },

        {
          path: "about",
          element: <About />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "product",
          element: <Products />,
        },
        {
          path: "checkout",
          element: <CheckOut />,
        },

        {
          path: "orders",
          element: <Orders />,
        },
      ],
    },

    {
      path: "login",
      element: <>{user ? <Navigate to="/" /> : <Login />}</>,
    },
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(authIsReady());
    });
  }, []);
  return <>{AuthIsReady && <RouterProvider router={routes} />}</>;
}

export default App;
