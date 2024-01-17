import { useState } from "react";
import { Link } from "react-router-dom"

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
      });
    
    
      const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de inicio de sesión, por ejemplo, enviar los datos a la API
    
        try {
          const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });
          const data = await response.json();
          console.log('Respuesta de la API:', data);
          enviarSolicitud(data.access_token);
          
          // Puedes redirigir o realizar otras acciones después de un registro exitoso
        } catch (error) {
          console.error('Error al iniciar sesion:', error.response.data);
          // Puedes manejar errores y mostrar mensajes al usuario
        }
      };
      const enviarSolicitud = async (token) => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/auth/me', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          // Manejar la respuesta de la API
          console.log(data);
          if (data) {
              localStorage.setItem('token', JSON.stringify(token));
              localStorage.setItem('iduser', JSON.stringify(data.id));
              window.location.href = '/home';
          }
        } catch (error) {
          // Manejar errores de la solicitud
          console.error('Error al enviar la solicitud:', error);
        }
      };
  return (
    <div><div className="min-h-screen flex items-center justify-center bg-white">
    <div className="border border-solid  p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-6 ">Red DB</h2>
    
      {/* Formulario de inicio de sesión */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2 ">Correo electrónico</label>
          <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
        </div>
    
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2 ">Contraseña</label>
          <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
        </div>
    
        <button type="submit" className="w-full bg-blue-500  py-2 px-4 rounded text-white focus:outline-none focus:bg-blue-600 hover:bg-blue-600">Iniciar sesión</button>
      </form>
    
      <p className="mt-4 ">
        ¿No tienes una cuenta? <Link to="/register" className="text-blue-400">Regístrate aquí</Link>
        <br />
      </p>
    </div>
    </div></div>
  )
}

export default Login