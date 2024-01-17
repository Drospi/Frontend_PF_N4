import { useEffect, useState } from "react";
import Header from "./Header"

const Paginas = () => {
    const [datos, setDatos] = useState(null);
    const token = JSON.parse(localStorage.getItem('token')); 
    const enviarSolicitud = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/paginas',{
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
    <div className="bg-white mt-16">
  <div className="">
    <h1 className="uppercase text-3xl ">Paginas</h1>
    <div className="mx-auto mt-10  flex justify-center flex-wrap max-w-2xl gap-x-8 gap-y-16 border-t border-gray-200 pt-10 ">
       
        
    {
        datos.map((item) => {
            console.log(item)
          return(
              <article  key={item.idpagina} className="flex max-w-xl hover:bg-gray-200 flex-col items-start justify-between">
          <div className=" cursor-pointer text-sm leading-6 max-w-md  p-8 rounded">
            <p className="font-semibold text-gray-900">
              <p href="#">
                {item.nombre}
              </p>
            </p>
            <p className="text-gray-600">{item.tipo}</p>
            <p>{item.descripcion}</p>
            <p className="text-end text-gray-300 text-sm">{item.usuariocreacion} - {item.fechacreacion}</p>
            <p className="text-end text-gray-300 text-sm">{item.usuariomodificacion} - {item.fechamodificacion}</p>
            <p className="text-blue-600 underline">{item.url}</p>
          </div>

      </article>
          )
      }
      )}
    

    </div>
  </div>
</div>
</>
  )
}

export default Paginas