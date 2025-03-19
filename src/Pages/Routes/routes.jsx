import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Mobility from "../Mobility/Mobility";
import Tourism from "../Tourism/Tourism";
import Services from "../Civil-Services/Services";
import Login from "../Login-Signup/Login";
import Signup from "../Login-Signup/Signup"
import UserProfile from "../Profile/User-Profile";
import { UserDataProvider } from "../../Services/user/user-obj";

function AppRoutes() {
  return (
    <Router>
      <UserDataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="UserProfile" element={<UserProfile />} />
          <Route path="/Mobility" element={<Mobility />} />
          <Route path="/Tourism" element={<Tourism />} />
          <Route path="/Services" element={<Services />} />
        </Routes>
      </UserDataProvider>
    </Router>
  )
}

export default AppRoutes; 
