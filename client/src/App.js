import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import HomePage from "./views/Home";
import AllEvents from "./views/AllEvents";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";

// import CreateEventPage from "./views/CreateEvent";
// import EditEventPage from "./views/EditEvent";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          {/* <Route path="/create-event">
            <CreateEventPage />
          </Route>
          <Route path="/edit-event/:id">
            <EditEventPage />
          </Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
