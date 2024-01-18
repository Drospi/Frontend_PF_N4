import { useEffect, useState } from "react";
import Header from "./Header"

const Roles = () => {
    const [datos, setDatos] = useState(null);
    const iduser = JSON.parse(localStorage.getItem('iduser'));

    const [credentials, setCredentials] = useState({
      rol: '',
      idusuario: iduser,
    });
  
  
    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Aquí puedes manejar la lógica de inicio de sesión, por ejemplo, enviar los datos a la API
  
      try {
        console.log(credentials);
        await fetch('http://127.0.0.1:8000/api/auth/roles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        location.reload();
        // Puedes redirigir o realizar otras acciones después de un registro exitoso
      } catch (error) {
        console.error('Error al iniciar sesion:', error.response.data);
        // Puedes manejar errores y mostrar mensajes al usuario
      }
    };
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
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nuevo Rol"
          name="rol"
          value={credentials.rol}
          onChange={handleChange}
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
      <tr key={data.id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border">{data.id}</td>
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