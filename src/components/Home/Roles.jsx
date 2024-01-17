import { useEffect, useState } from "react";
import Header from "./Header"

const Roles = () => {
    const [datos, setDatos] = useState(null);
  const enviarSolicitud = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/roles',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // Manejar la respuesta de la API
      if (data) {
        setDatos(data);
        console.log(datos);
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
    <div className="container mx-auto mt-8">
      <form className="flex">
        <input
          type="text"
          placeholder="Nuevo Rol"
          className="w-full p-2 border border-gray-300 rounded-l"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Agregar
        </button>
      </form>
    </div>
     <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Rol</th>
            <th className="py-2 px-4 border">Fecha de Creacion</th>
            <th className="py-2 px-4 border">Fecha de Modificacion</th>
            <th className="py-2 px-4 border">Usuario Creacion</th>
            <th className="py-2 px-4 border">Usuario Modificacion</th>
          </tr>
        </thead>
        <tbody>
        {datos.map((data) => (
      <tr key={data.idrol} className="hover:bg-gray-100">
            <td className="py-2 px-4 border">{data.idrol}</td>
            <td className="py-2 px-4 border">{data.rol}</td>
            <td className="py-2 px-4 border">{data.fechacreacion}</td>
            <td className="py-2 px-4 border">{data.fechamodificacion}</td>
            <td className="py-2 px-4 border">{data.usuariocreacion}</td>
            <td className="py-2 px-4 border">{data.usuariomodificacion}</td>
          </tr>
    ))}
          
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Roles