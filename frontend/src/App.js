import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext/AuthContext";
import AdminLoginPage from "./Pages/AdminLoginPage";
import AdminSignupPage from "./Pages/AdminSignupPage";
import CreateBookPage from "./Pages/CreateBookPage";
import EditBookPage from "./Pages/EditBookPage";
import HomePage from "./Pages/HomePage";
import PrivateRoute from "./Utils/PrivateRoute";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<AdminLoginPage/>} path='admin/login/'/>
            <Route element={<AdminSignupPage/>} path='admin/signup/'/>
            <Route element={<HomePage/>} path='/' />
            <Route element={<PrivateRoute/>} path='/'>
              <Route element={<CreateBookPage/>} path='add_book/'/>
              <Route element={<EditBookPage/>} path='add_book/:id/'/>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
