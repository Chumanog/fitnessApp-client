import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Workouts from './pages/Workouts';
import AddWorkout from './pages/AddWorkout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/addWorkout" element={<AddWorkout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;