
import { useEffect, useState } from "react";
import Header from "./Header"
const Home = () => {
  const [datos, setDatos] = useState(null);
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
        setDatos(data);

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
    <div>
      <h1>Home</h1>
      <p>{datos[0].usuario}</p>
      <p>{datos[0].primernombre}</p>
      <p>{datos[0].segundonombre}</p>
      <p>{datos[0].primerapellido}</p>
      <p>{datos[0].segundoapellido}</p>
      <p>{datos[0].fechacreacion}</p>
      <p>{datos[0].idrol? 'no tiene rol':datos[0].idrol}</p>

      

    </div>
    </>
    
  )
}

export default Home