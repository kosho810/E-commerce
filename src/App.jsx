import React from "react";
import Layout from "./components/Layout'/Layout";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import { Navigate } from 'react-router-dom'
import Brands from "./components/Brands/Brands";
import Services from "./components/Services/Services";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Home from "./components/Home/Home";
import Notfound from "./components/Notfound/Notfound";
import Address from "./components/Address/Address";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AuthContextProvider from "./Contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "./components/ProtectedRoute/AuthProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Orders from "./components/Orders/Orders";
import { ToastContainer } from 'react-toastify';
import CartContextProvider from "./Contexts/CartContext";
import { QueryClient, QueryClientProvider } from "react-query"

import {ReactQueryDevtools} from "react-query/devtools"




export default function App() {
  const queryClient = new QueryClient()

  const routers = createHashRouter([{
    path: "", element: <Layout />, children: [
      { path: '', element: <Navigate to={'/home'} /> },
      { path: 'home', element: <ProtectedRoute> <Home /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute> <Products /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /></ProtectedRoute> },
      { path: 'services', element: <ProtectedRoute> <Services /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute> <Categories /></ProtectedRoute> },
      { path: 'productDetails/:id', element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },

      { path: 'allorders', element: <ProtectedRoute> <Orders /></ProtectedRoute> },
      { path: 'address/:cartId', element: <ProtectedRoute> <Address /></ProtectedRoute> },
      { path: '*', element: <Notfound /> },
      { path: 'login', element: <AuthProtectedRoute><Login /></AuthProtectedRoute> },
      { path: 'register', element: <AuthProtectedRoute><Register /></AuthProtectedRoute> },
    ]
  }]);
  return (
    <>

      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <AuthContextProvider>
            <RouterProvider router={routers}></RouterProvider>
          </AuthContextProvider>
        </CartContextProvider>
        <ReactQueryDevtools position="bottom-left"/>
      </QueryClientProvider>

      <ToastContainer />
    </>
  );
}
