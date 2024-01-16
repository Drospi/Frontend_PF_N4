
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css'
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import Bitacoras from './components/Home/Bitacoras';
import Enlaces from './components/Home/Enlaces';
import Roles from './components/Home/Roles';
import Update from './components/Home/Update';
import Usuarios from './components/Home/Usuarios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/register" Component={Register}/>
        <Route path="/home" Component={Home} />
        <Route path="/enlaces" Component={Enlaces} />
        <Route path="/roles" Component={Roles} />
        <Route path="/update" Component={Update} />
        <Route path="/usuarios" Component={Usuarios} />
        <Route path="/bitacoras" Component={Bitacoras} />
      </Routes>
    </Router>
  )
}

export default App
