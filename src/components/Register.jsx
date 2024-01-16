import { useState } from "react";
import { Link } from "react-router-dom"

const Register = () => {
    const URL_BASE = 'http://127.0.0.1:8000';
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
    const [jwt, setJwt] = useState({
        password: '',
        email: '',
        name: '',
    });

    const handleInputChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setJwt({password: formulario.clave, email: formulario.email, name: formulario.usuario })
        console.log(jwt);
        console.log(formulario);
        try {
            await fetch(`${URL_BASE}/api/auth/personas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formulario),
            });
            await fetch(`${URL_BASE}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jwt),
            });


            // Puedes manejar la respuesta del servidor según tus necesidades
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };
  return (
    <div><div className="min-h-screen flex items-center justify-center bg-white">
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
        ¿Ya tienes una cuenta? <Link to="/" className="text-blue-400">Iniciar sesion</Link>
        <br />
      </p>
    </div>
    </div></div>
  )
}

export default Register