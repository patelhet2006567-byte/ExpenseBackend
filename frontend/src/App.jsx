import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Home";
import Signup from "./components/Home/Signup";
import PageNotFound from "./components/PageNotFound";
import Userlayout from "./components/User/Userlayout";
import ForgotPassword from"./components/Home/ForgotPassword";

 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
      <Route path="/app/user" element={<Userlayout/>}></Route>
      <Route path="/*" element={<PageNotFound/>}/>
    </Routes>
  );
};

export default App;