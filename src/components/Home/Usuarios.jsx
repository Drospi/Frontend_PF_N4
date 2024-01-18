import { useEffect, useState } from "react";
import Header from "./Header"

const Usuarios = () => {
  const [datos, setDatos] = useState(null);
  const token = JSON.parse(localStorage.getItem('token')); 
  const iduser = JSON.parse(localStorage.getItem('iduser'));

    const [credentials, setCredentials] = useState({
      email: '',
        primernombre: '',
        segundonombre: '',
        primerapellido: '',
        segundoapellido: '',
        usuariocreacion: 'registro',
        idrol: null,
        usuario: '',
        clave: '',

    });
  
  
    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Aquí puedes manejar la lógica de inicio de sesión, por ejemplo, enviar los datos a la API
  
      try {
        console.log(credentials);
        await fetch('http://127.0.0.1:8000/api/auth/personas', {
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
      <h2 className="text-2xl font-bold mb-6">Agregar Usuario</h2>
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
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            required
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
         
          <input
            type="text"
            id="primernombre"
            name="primernombre"
            className="mt-1 p-2 w-full border rounded-md"
            required
            placeholder="Primer Nombre"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
         
          <input
            type="text"
            id="segundonombre"
            name="segundonombre"
            className="mt-1 p-2 w-full border rounded-md"
            required
            placeholder="Segundo Nombre"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
         
          <input
            type="text"
            id="primerapellido"
            name="primerapellido"
            className="mt-1 p-2 w-full border rounded-md"
            required
            placeholder="Primer Apellido"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
         
          <input
            type="text"
            id="segundoapellido"
            name="segundoapellido"
            className="mt-1 p-2 w-full border rounded-md"
            required
            placeholder="Segundo Apellido"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
         
          <input
            type="text"
            id="usuario"
            name="usuario"
            className="mt-1 p-2 w-full border rounded-md"
            required
            placeholder="Usuario"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
         
          <input
            type="password"
            id="clave"
            name="clave"
            className="mt-1 p-2 w-full border rounded-md"
            required
            placeholder="Password"
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