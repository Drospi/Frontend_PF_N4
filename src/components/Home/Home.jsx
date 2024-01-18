
import { useEffect, useState } from "react";
import Header from "./Header"
const Home = () => {
  const [datos, setDatos] = useState(null);
  const enviarSolicitud = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const iduser = JSON.parse(localStorage.getItem('iduser'));
    console.log(token);
    console.log(iduser);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auth/personas/${iduser}`,{
        method:'GET'
      });
      const data = await response.json();
      // Manejar la respuesta de la API
      console.log(data);
      if (data) {
        setDatos(data);

      }}
      catch(error) {
        // Manejar errores de la solicitud
        console.error('Error al enviar la solicitud:', error);
      }
    };
    useEffect(() => {
      enviarSolicitud();
      
    },[]);
if (!datos) {
// Puedes manejar el caso en que no hay datos en la ubicación del navegador
return <p>No se han proporcionado datos</p>;
}
  return (
    <>
    <Header></Header>

    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Datos Personales</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Nombres: </label>
        <p className="mt-1 text-lg font-semibold">{datos.primernombre} {datos.segundonombre}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Apellidos: </label>
        <p className="mt-1 text-lg font-semibold">{datos.primerapellido} {datos.segundoapellido}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Rol: </label>
        <p className="mt-1 text-lg font-semibold">{datos.idrol}</p>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Creado por:</label>
        <p className="mt-1 text-lg font-semibold">{datos.usuario}</p>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Creado en:</label>
        <p className="mt-1 text-lg font-semibold">{datos.fechacreacion}</p>
      </div>
    </div>
    </>
    
  )
}

export default Home