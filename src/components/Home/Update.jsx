import { useEffect, useState } from "react";
import Header from "./Header"


const Update = () => {
  const URL_BASE = 'http://127.0.0.1:8000';
  const iduser = JSON.parse(localStorage.getItem('iduser'));
  const [formulario, setFormulario] = useState({
    email: '',
    primernombre: '',
    segundonombre: '',
    primerapellido: '',
    segundoapellido: '',
    idusuariomodificacion: iduser,
    idrol: null,
    usuario: '',
    clave: '',
});

useEffect(() => {
  enviarSolicitud();
  
},[iduser]);

const token = JSON.parse(localStorage.getItem('token'));
  
    const handleInputChange = (e) => {
      setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch(`${URL_BASE}/api/auth/personas/${iduser}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formulario),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const respuestaJson = await response.json();
        console.log('Respuesta del servidor:', respuestaJson);
        // Handle the server response as needed
    
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Implement user-friendly error handling, e.g., set an error state
      }
    };

    const enviarSolicitud = async () => {
      console.log(token);
      try {
        const response = await fetch(`${URL_BASE}/api/auth/personas/${iduser}`,{
          method:'GET'
        });
        const data = await response.json();
        // Manejar la respuesta de la API
        console.log(data);
        if (data) {
          setFormulario({
            email: data[0].email,
      primernombre: data[0].primernombre,
      segundonombre: data[0].segundonombre,
      primerapellido:   data[0].primerapellido,
      segundoapellido: data[0].segundoapellido,
      idrol: data[0].idrol,
      usuario: data[0].usuario
          })
        }}
        catch(error) {
          // Manejar errores de la solicitud
          console.error('Error al enviar la solicitud:', error);
        }
      };
  return (
    <>
    <Header></Header>
    <div className=" mt-8 w-full flex items-center justify-center bg-white">
    <div className="border border-solid  p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-6 ">Red DB</h2>
    
      {/* Formulario de inicio de sesión */}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
          required
            type="text"
            placeholder="Primer Nombre"
            name="primernombre"
            value={formulario.primernombre}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-4"
          />
        </div>
        <div className="mb-2">
          <input
          required
            type="text"
            placeholder="Segundo Nombre"
            name="segundonombre"
            value={formulario.segundonombre}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-4"
          />
        </div>
        <input
          required
            type="text"
            hidden
            name="idusuariomodificacion"
            value={formulario.idusuariomodificacion}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-4"
          />
        <div className="mb-2">
          <input
          required
            type="text"
            placeholder="Primer Apellido"
            name="primerapellido"
            value={formulario.primerapellido}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-4"
          />
        </div>
        <div className="mb-2">
          <input
          required
            type="text"
            placeholder="Segundo Apellido"
            name="segundoapellido"
            value={formulario.segundoapellido}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-4"
          />
        </div>
        <div className="mb-2">
          <input
          required
            type="text"
            placeholder="Usuario"
            name="usuario"
            value={formulario.usuario}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-4"
          />
        </div>
        <div className="mb-2">
          <input
          required
            type="password"
            placeholder="Contraseña"
            name="clave"
            min={6}
            value={formulario.clave}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-4"
          />
        </div>
        <div className="mb-2">
          <input
          required
            type="text"
            placeholder="Email"
            name="email"
            value={formulario.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-4"
          />
        </div>

                {/* Repite estos bloques para otros campos del formulario */}

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Crear Persona
                </button>
            </form>
    
      <p className="mt-4 ">
        <br />
      </p>
    </div>
    </div>
    </>
  )
}

export default Update