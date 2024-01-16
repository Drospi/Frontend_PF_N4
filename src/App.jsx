
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css'
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/register" Component={Register}/>
        <Route path="/home" Component={Home} />
       
      </Routes>
    </Router>
  )
}

export default App
