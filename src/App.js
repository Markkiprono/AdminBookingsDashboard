import "./nav.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Schedule from "./Pages/Schedule";
import Orders from "./Pages/Orders";
import Payment from "./Pages/Payment";
import Users from "./Pages/Users";
import Redirect from "./components/Redirect";
import Sidebar from "./components/SideBar";
import Login from "./Pages/Login";
import Unauthorised from "./components/Unauthorised";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Sidebar />}>
            <Route path="/" element={<Schedule />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/PaymentHistory" element={<Payment />} />
            <Route path="/Users" element={<Users />} />
          </Route>

          <Route path="/invalid" element={<h1>401: Unauthorised Login</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
