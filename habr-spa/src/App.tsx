// main component


import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Home from './pages/Home';
import PostPage from './pages/PostPage';

function App() {
   return (
 <BrowserRouter>
 <div className="min-h-screen bg-gray-50">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post/:id" element={<PostPage />} />
  </Routes>
  </div>
 </BrowserRouter>
)}

export default App
