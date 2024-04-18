import { Route, Routes } from "react-router-dom";

import Aboutus from "./pages/Aboutus";
import ContactUs from "./pages/ContactUs";
import CourseDescription from "./pages/Course/CourseDescription";
import CourseList from "./pages/Course/CourseList";
import Denied from "./pages/Denied";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Aboutus />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/denied" element={<Denied />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/course/description" element={<CourseDescription />} />
    </Routes>
  );
}

export default App;
