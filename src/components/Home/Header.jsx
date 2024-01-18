import { Link } from "react-router-dom"
import Home from "./Home"
import Bitacoras from "./Bitacoras"
import Roles from "./Roles"
import Enlaces from "./Enlaces"
import Usuarios from "./Usuarios"
import Update from "./Update"
import { useEffect, useState } from "react"
import Paginas from "./Paginas"

const Header = () => {
  const [user, setUser] = useState(null);
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('iduser');
    window.location.href = '/';
  }
  const enviarSolicitud = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const iduser = JSON.parse(localStorage.getItem('iduser'));
    console.log(token);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auth/personas/${iduser}`,{
        method:'GET'
      });
      const data = await response.json();
      // Manejar la respuesta de la API
      console.log(data);
      if (data) {
        setUser(data);

      }}
      catch(error) {
        // Manejar errores de la solicitud
        console.error('Error al enviar la solicitud:', error);
      }
    };
    useEffect(() => {
      enviarSolicitud();
      
    },[]);
if (!user) {
// Puedes manejar el caso en que no hay user en la ubicación del navegador
return <p>No se han proporcionado user</p>;
}
  return (
    <>
    <header className='flex flex-col justify-between  items-center rounded border border-solid shadow-md bg-white font-bold w-full pb-4 '>
      <img src="img/1.jpg" className="w-full h-[30vh] " alt="" />
      <button onClick={cerrarSesion} className="bg-red-500 text-white text-md p-4 rounded absolute top-0 right-0">Cerrar sesion</button>
      <div className="w-24 h-24 flex items-center justify-center mt-[-4rem] bg-cyan-300 rounded-full"></div>
      <nav className="flex gap-4 justify-between w-[90%] ml-auto mr-auto text-xl items-center">
        <Link className="hover:text-purple-800 transition" to={"/bitacoras"} Component={Bitacoras}>Bitacoras</Link>
        <Link className="hover:text-purple-800 transition" to={"/roles"}Component={Roles}>Roles</Link>
        <Link className="hover:text-purple-800 transition" to={"/update"}Component={Update}>Editar</Link>
        <Link to={"/home"} Component={Home} className="uppercase">
        <h1 className="text-3xl" >{user.usuario}</h1>
        <p className="text-xl text-gray-400">Gerenal Manager</p>
        </Link>
        
        <Link className="hover:text-purple-800 transition" to={"/paginas"}Component={Paginas}>Paginas</Link>
        <Link className="hover:text-purple-800 transition" to={"/enlaces"}Component={Enlaces}>Enlaces</Link>
        <Link className="hover:text-purple-800 transition" to={"/usuarios"}Component={Usuarios}>Usuarios</Link>
      </nav>
    </header>
    </>
  )
}

export default Header