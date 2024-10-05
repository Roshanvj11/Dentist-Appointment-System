import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './register/login';
import RegisterForm from './register/register';
import Dashboard from '../Admin/Dashboard';
import Failure from './pages/Failure';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
// import Header from './pages/Header';
// import Footer from './pages/Footer';
import Home from './pages/Home';
import About from './pages/About';
import TreatMents from './pages/Treatments';
import Blog from './pages/Blog';
import OurDoctors from './pages/OurDoctors';
import Feedback from './pages/Feedback';
import Appointment from './pages/Appointment';
import { AppProvider } from './context/globalContext';
import Layout from './pages/Layout';


function App() {
  return (
    <div className='mainApp'>
      <AppProvider>
        {/* <Route path='/header' element={<Header />}></Route> */}
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/layout' element={<Layout />} />
            <Route path='/Appointment' element={<Appointment />} />

            {/* <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/treatments' element={<TreatMents />} />
            <Route path='/ourDoctors' element={<OurDoctors />} />
            <Route path='/feedback' element={<Feedback />} /> */}
            <Route path='/blog' element={<Blog />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/failure' element={<Failure />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>

        <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
