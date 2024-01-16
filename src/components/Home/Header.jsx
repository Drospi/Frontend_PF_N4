import { Link } from "react-router-dom"
import Home from "./Home"
import Bitacoras from "./Bitacoras"
import Roles from "./Roles"
import Enlaces from "./Enlaces"
import Usuarios from "./Usuarios"

const Header = () => {
  return (
    <>
    <header className='flex flex-col justify-between items-center rounded border border-solid shadow-md bg-white font-bold w-full pb-4 text-3xl'>
      <img src="img/1.jpg" className="w-full h-[30vh] " alt="" />
      <div className="w-24 h-24 flex items-center justify-center mt-[-4rem] bg-cyan-300 rounded-full"></div>
      <nav className="flex gap-4 justify-between w-[90%] ml-auto mr-auto text-xl items-center">
        <Link className="hover:text-purple-800 transition" to={"/bitacoras"} Component={Bitacoras}>Bitacoras</Link>
        <Link className="hover:text-purple-800 transition" to={"/roles"}Component={Roles}>Roles</Link>
        <div className="uppercase">
        <Link className="text-3xl" to={"/home"} Component={Home}>Mi nombre</Link>
        <p className="text-xl text-gray-400">Gerenal Manager</p>
        </div>
        <Link className="hover:text-purple-800 transition" to={"/enlaces"}Component={Enlaces}>Enlaces</Link>
        <Link className="hover:text-purple-800 transition" to={"/usuarios"}Component={Usuarios}>Usuarios</Link>
      </nav>
    </header>
    </>
  )
}

export default Header