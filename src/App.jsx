import "./App.css";
import Home from "./_Pages/Home.jsx";
import Calculate from "./_Pages/Calculate.jsx";
import Results from "./_Pages/Results.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Error from "./_Pages/Error.jsx";

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", () => console.clear());
}

const routeItems = [
  {
    name: `Buy Orders`,
    path: "",
    element: <Calculate />,
  },
  {
    path: "results",
    element: <Results />,
  },
];

const router = createBrowserRouter([
  {
    path: "/debt-calculator",
    element: <Home />,
    errorElement: <Error />,
    children: routeItems,
  },
  {
    path: "*",
    element: <Navigate to="/debt-calculator" />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
