import { Route, Routes } from "react-router-dom";

import Aboutus from "./pages/Aboutus";
import RequireAuth from "./pages/auth/RequireAuth";
import ContactUs from "./pages/ContactUs";
import CourseDescription from "./pages/Course/CourseDescription";
import CourseList from "./pages/Course/CourseList";
import CreateCourse from "./pages/Course/CreateCourse";
import Denied from "./pages/Denied";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Payments/Checkout";
import Signup from "./pages/Signup";
import EditProfile from "./pages/user/EditProfile";
import Profile from "./pages/user/Profile";

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

      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/edit-profile" element={<EditProfile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
      </Route>
    </Routes>
  );
}

export default App;
