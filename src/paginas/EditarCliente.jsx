import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Formulario from "../components/Formulario"

const EditarCliente = () => {

  const [ cliente, setCliente ] = useState({})
    
  const [ cargando, setCargando ] = useState(true)
  const {id} = useParams()

  useEffect( () => {
      const obtenerClienteAPI = async () => {

          try {
              const url = `http://localhost:4000/clientes/${id}`
              const respuesta = await fetch(url)
              const resultado = await respuesta.json()

              setCliente(resultado)

          } catch (error) {
              console.log(error)
          }
          setTimeout(() => {
              setCargando(false)
          }, 300);
          
      }
      obtenerClienteAPI()
  }, [])
  
  return (
    
    cliente?.nombre || cargando ? (
      <div>
        <h1 className="text-4xl font-bold text-blue-900">Editar Cliente</h1>
        <p className="mt-3">Edición de los datos del cliente.</p>
        <Formulario
          cliente={cliente}
          cargando={cargando}
        />
    </div>
    ) : (
      <h1 className="text-4xl font-bold text-blue-900">El cliente no existe</h1>
    )
    
  )
}

export default EditarCliente