//css files
import './App.css'
import './styles/home.css'
import './styles/ownerDashBoard.css'
import './styles/login.css'
import './styles/signUp.css'
import './styles/createMeetForm.css'
import './styles/eventsOnDashboard.css'
import './styles/customerDashBoard.css'
import './styles/customerCalendar.css'
import './styles/customerDetailsForm.css'
import './styles/bookedMeetings.css'

//pages
import { Home } from './pages/Home'
import { Login } from './pages/login'
import { SignUp } from './pages/signUp'
import { OwnerDashBoard } from './pages/ownerDashBoard'
import { CreateMeetForm } from './pages/createMeetForm'
import { CustomerDashBoard } from './pages/customerDashBoard'
import { CustomerCalendar } from './pages/customerCalendar'


import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/ownerDashboard" element={<OwnerDashBoard />} />
          <Route path="/createMeeting" element={<CreateMeetForm />} />
          <Route path="/customerDashBoard" element={<CustomerDashBoard />} />
          <Route path="/customerCalendar" element={<CustomerCalendar />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

