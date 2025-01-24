
// import {
//   Route,
//   BrowserRouter as Router,
//   Routes
// } from "react-router-dom";
// import AdminBookingList from "./booking/AdminBookingList ";
// import Bookingdetail from "./booking/Bookingdetail";
// import EditBookingPage from "./booking/EditBookingPage ";
// import Navbar from "./components/Navbar";
// import Homepage from "./homepage/Homepage";
// import AddHotel from "./Hotels/AddRoom";
// import ShowRooms from "./Hotels/ShowRooms";
// import UpdateDeleteRoom from "./Hotels/UpdateDEleteRoom";
// import RoomPage from "./Hotels/UserRooms";
// import ViewRoom from "./Hotels/ViewRoom";
// import Login from "./login/Login";
// import Register from "./register/Register";
// import Profile from "./user/Profile";

// function UserLayout() {
//   return (
//     <>
//       <Navbar />
//       {/* <Outlet /> */}
//     </>
//   );
// }

// function App() {

//   return (



//     <Router>

//       <Routes>

//         {/* <Route element={<UserLayout />}> */}

//         <Route path="/" element={<Homepage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/hotel" element={<AddHotel />} />
//         <Route path="/room" element={<RoomPage />} />
//         <Route path="/rooms" element={<ShowRooms />} />
//         <Route path="/room/:id" element={<ViewRoom />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="/room/update-delete/:id" element={<UpdateDeleteRoom />} />
//         <Route path="/bookings" element={<Bookingdetail />} />
//         <Route path="/admin/bookings" element={<AdminBookingList />} />
//         <Route path="/admin/booking/edit/:id" element={<EditBookingPage />} />


//         {/* </Route> */}

//       </Routes>

//     </Router>

//   );

// }

// export default App;

import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminBookingList from "./booking/AdminBookingList ";
import Bookingdetail from "./booking/Bookingdetail";
import EditBookingPage from "./booking/EditBookingPage ";
import Navbar from "./components/Navbar";
import Homepage from "./homepage/Homepage";
import AddHotel from "./Hotels/AddRoom";
import ShowRooms from "./Hotels/ShowRooms";
import UpdateDeleteRoom from "./Hotels/UpdateDEleteRoom";
import RoomPage from "./Hotels/UserRooms";
import ViewRoom from "./Hotels/ViewRoom";
import Login from "./login/Login";
import Register from "./register/Register";
import Profile from "./user/Profile";

function App() {

  return (
    <Router>
      {/* Add Navbar here to appear on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotel" element={<AddHotel />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/rooms" element={<ShowRooms />} />
        <Route path="/room/:id" element={<ViewRoom />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/room/update-delete/:id" element={<UpdateDeleteRoom />} />
        <Route path="/bookings" element={<Bookingdetail />} />
        <Route path="/admin/bookings" element={<AdminBookingList />} />
        <Route path="/admin/booking/edit/:id" element={<EditBookingPage />} />
      </Routes>
      <ToastContainer />

    </Router>
  );

}

export default App;
