import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

  const [clientes, setClientes] = useState([])


  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setClientes(resultado)

      } catch (error) {
        console.log(error)
      }
    }
    obtenerClientesAPI()
  }, [])  

  const handleSubmitEliminar = async (id) => {
    const confirmar = confirm('¿Deseas eliminar este cliente?')

    if(confirmar){
      try {
        
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })
        
        await respuesta.json()
        const newArrayClientes = clientes.filter( cliente => cliente.id !== id)
        setClientes(newArrayClientes)

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
        <h1 className="text-4xl font-bold text-blue-900">Clientes</h1>
        <p className="mt-3">Administra tus clientes.</p>
        <div style={{overflowX: "auto"}}>
                <table className="min-w-full mt-10 bg-white shadow-md rounded-sm text-center">
                  <thead className='bg-slate-400 text-white py-3' style={{height: "40px"}}>
                    <tr>
                      <th>Nombre</th>
                      <th>Empresa</th>
                      <th>Contacto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>

                  { clientes.map( cliente => (
                      <Cliente
                        key={cliente.id}
                        cliente={cliente}
                        handleSubmitEliminar={handleSubmitEliminar}
                      />
                  ))}

                  </tbody>
                </table>
        </div>

          
    </>
  )
}

export default Inicio