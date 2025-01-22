import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import Home from "./recipes/Home";
import AllRecipes from "./recipes/AllRecipes";
import AddRecipe from "./recipes/AddRecipe";
import ErrorNoSignUp from "./recipes/ErrorNoSignUp";

const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/AllRecipes', element: <AllRecipes /> },
            {path:'/error',element:<ErrorNoSignUp/>},
            {path:'AddRecipe',element:<AddRecipe/>}
        ]
    }

])
export default router