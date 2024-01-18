import { useEffect, useState } from "react";
import Header from "./Header"
const Bitacoras = () => {
  const [datos, setDatos] = useState(null);
  const token = JSON.parse(localStorage.getItem('token')); 
  const enviarSolicitud = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/bitacoras',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
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
    }, []);

    console.log(datos);
    if (!datos) {
      // Puedes manejar el caso en que no hay user en la ubicación del navegador
      return <p>No se han proporcionado user</p>;
      }
  return (
    <>
    <Header></Header>
    <div>Bitacoras</div>
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Bitácoras</h1>
      <div className="w-full gap-4">
        {datos.map((data, index) => (
          <div key={index} className="min-w-xl">
          <div className="bg-white flex justify-between items-center w-full text-gray-300 p-4 rounded shadow-md">
            <p className="text-lg font-bold mr-4 mb-2">{data.idbitacora}</p>
            <p className="text-lg font-bold mr-4 mb-2">{data.bitacora}</p>
            <p className="text-lg font-bold mr-4 mb-2">{data.fecha}</p>
            <p className="text-lg font-bold mr-4 mb-2">{data.fecha}</p>
            <p className="text-lg font-bold mr-4 mb-2">{data.hora}</p>
            <p className="text-lg font-bold mr-4 mb-2">{data.ip}</p>
            <p className="text-lg font-bold mr-4 mb-2">{data.os}</p>
            <p className="text-lg font-bold mr-4 mb-2">{data.usuario}</p>

          </div>
          <hr className="bg-blue-500 h-0.5 w-full mb-2" />
          </div>
          
        ))}
      </div>
    </div>
    </>
  )
}

export default Bitacoras