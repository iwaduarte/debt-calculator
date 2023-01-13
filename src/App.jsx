import "./App.css";
import Home from "./Components/_Pages/Home.jsx";
import Calculate from "./Components/_Pages/Calculate.jsx";
import Results from "./Components/_Pages/Results.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Error from "./Components/_Pages/Error.jsx";

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
    path: "/supermoney",
    element: <Home />,
    errorElement: <Error />,
    children: routeItems,
  },
  {
    path: "*",
    element: <Navigate to="/supermoney" />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
