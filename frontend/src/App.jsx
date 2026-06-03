import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Home";
import Signup from "./components/Home/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;