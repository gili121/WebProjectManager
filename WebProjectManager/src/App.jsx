import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import MyProjects from './Components/MyProject';
import ListProject from './Components/ListProject'; 
import AddProject from './Components/AddProject';
import AddTask from './Components/AddTask';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ListProject" element={<ListProject />} />
        <Route path="/MyProjects" element={<MyProjects />} />
        <Route path="/AddProject" element={<AddProject />} />
        <Route path="/AddTask" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
