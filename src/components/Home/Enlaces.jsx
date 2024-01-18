import { useEffect, useState } from "react";
import Header from "./Header"


const Enlaces = () => {
  const [datos, setDatos] = useState(null);
  const token = JSON.parse(localStorage.getItem('token')); 

  const iduser = JSON.parse(localStorage.getItem('iduser'));

    const [credentials, setCredentials] = useState({
      url: '',
      idusuariocreacion: iduser,
      nombre:'',
      descripcion:'',
      tipo:'',

    });
  
  
    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Aquí puedes manejar la lógica de inicio de sesión, por ejemplo, enviar los datos a la API
  
      try {
        console.log(credentials);
        await fetch('http://127.0.0.1:8000/api/auth/enlaces', {
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
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/enlaces',{
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
    <div className="container mx-auto mt-8">
      <div className="flex">
        <input
          type="text"
          placeholder="Nuevo Enlace"
          className="w-full p-2 border border-gray-300 rounded-l"
        />
        <button
          id="openModal"
          onClick={() => {
            const modal = document.getElementById('modal');
            modal.style.display = 'block';
          }}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Agregar
        </button>
      </div>

     
    </div>
    <div id="modal" className="bg-white hidden position-absolute top-0 start-0 w-100 h-100 text-center transition-transform duration-300 ease-in-out">
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
    <button className=" w-full text-end text-gray-500 hover:text:gray-300 text-sm p-2" onClick={
        ()=>{
          const modal = document.getElementById('modal');
          modal.style.display = 'none';
        }
      }>Mostrar menos</button>
      <h2 className="text-2xl font-bold mb-6">Agregar Enlace y Pagina</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
         
         <input
           type="text"
           id="idusuariocreacion"
           name="idusuariocreacion"
           hidden
           value={iduser}
           className="mt-1 p-2 w-full border rounded-md"
           placeholder="Ingresa tu nombre"
         />
       </div>
        <div className="mb-4">
         
          <input
            type="text"
            id="url"
            name="url"
            className="mt-1 p-2 w-full border rounded-md"
            required
            placeholder="URL"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
         
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="mt-1 p-2 w-full border rounded-md"
            required
            placeholder="Nombre"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
         
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            className="mt-1 p-2 w-full border rounded-md"
            required
            placeholder="Descripcion"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
         
          <input
            type="text"
            id="tipo"
            name="tipo"
            className="mt-1 p-2 w-full border rounded-md"
            required
            placeholder="Tipo"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>

    </div>
     <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Pagina</th>
            <th className="py-2 px-4 border">url</th>
            <th className="py-2 px-4 border">tipo</th>
            <th className="py-2 px-4 border">Fecha de Creacion</th>
            <th className="py-2 px-4 border">Fecha de Modificacion</th>
            <th className="py-2 px-4 border">Usuario Creacion</th>
            <th className="py-2 px-4 border">Usuario Modificacion</th>
          </tr>
        </thead>
        <tbody>
        {datos.map((data)=>{
          console.log(data)
          return(
            <tr key={data.id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border">{data.id}</td>
            <td className="py-2 px-4 border">{data.nombre}</td>
            <td className="py-2 px-4 border">{data.url}</td>
            <td className="py-2 px-4 border">{data.tipo}</td>
            <td className="py-2 px-4 border">{data.fechacreacion}</td>
            <td className="py-2 px-4 border">{data.fechamodificacion}</td>
            <td className="py-2 px-4 border">{data.usuariocreacion}</td>
            <td className="py-2 px-4 border">{data.usuariomodificacion}</td>
            </tr>
          )          
        })} 
        
          
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Enlaces