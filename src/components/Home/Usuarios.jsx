import { useEffect, useState } from "react";
import Header from "./Header"

const Usuarios = () => {
  const [datos, setDatos] = useState(null);
  const token = JSON.parse(localStorage.getItem('token')); 
  const enviarSolicitud = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/personas',{
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
    <div>Usuarios</div>

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
            <th className="py-2 px-4 border">Nombres</th>
            <th className="py-2 px-4 border">Apellidos</th>
            <th className="py-2 px-4 border">Fecha de Creacion</th>
            <th className="py-2 px-4 border">Fecha de Modificacion</th>
            <th className="py-2 px-4 border">Usuario Creacion</th>
            <th className="py-2 px-4 border">Usuario Modificacion</th>
            
            <th className="py-2 px-4 border">rol</th>
            <th className="py-2 px-4 border">habilitado</th>

          </tr>
        </thead>
        <tbody>
          {console.log(datos)}
        {datos.map((data)=>{
          console.log(data)
          return(
            <tr key={data.idpersona} className="hover:bg-gray-100">
            <td className="py-2 px-4 border">{data.idpersona}</td>
            <td className="py-2 px-4 border">{data.primernombre} {data.segundonombre}</td>
            <td className="py-2 px-4 border">{data.primerapellido} {data.segundoapellido}</td>
            <td className="py-2 px-4 border">{data.fechacreacion}</td>
            <td className="py-2 px-4 border">{data.fechamodificacion}</td>
            <td className="py-2 px-4 border">{data.usuariocreacion}</td>
            <td className="py-2 px-4 border">{data.usuariomodificacion}</td>
            <td className="py-2 px-4 border">{data.rol}</td>
            <td className="py-2 px-4 border">{data.habilitado}</td>
            </tr>
          )          
        })} 
        
          
        </tbody>
      </table>
      </div>
    </>
  )
}

export default Usuarios