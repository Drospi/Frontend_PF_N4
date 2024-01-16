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
    {datos.map((data) => (
      <p key={data.idrol}>{data.rol}</p>
    ))}
    </>
  )
}

export default Roles