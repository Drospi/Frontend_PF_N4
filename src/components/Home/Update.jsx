import { useEffect, useState } from "react";
import Header from "./Header"


const Update = () => {
  const URL_BASE = 'http://127.0.0.1:8000';
  const iduser = JSON.parse(localStorage.getItem('iduser'));
  const [datos, setDatos] = useState(null);
  const [formulario, setFormulario] = useState({
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
    useEffect(() => {
      enviarSolicitud();
      
    },[]);



  const handleInputChange = (e) => {
      setFormulario({ ...formulario, [e.target.name]: e.target.value });

  };


  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formulario);
      setDatos({ ...formulario });
      try {
          await fetch(`${URL_BASE}/api/auth/personas/${iduser}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(datos),
          });
          


          // Puedes manejar la respuesta del servidor según tus necesidades
      } catch (error) {
          console.error('Error al realizar la solicitud:', error);
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