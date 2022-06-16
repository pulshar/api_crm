import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../components/Loader"

const VerCliente = () => {

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

        cargando ? <Loader /> : Object.keys(cliente).length > 0 ? (
                
                <div>
                    <p className="text-4xl font-bold text-blue-900">
                        {`Cliente: ${cliente.nombre}`}
                    </p>
                    <p className="mt-3">Información del cliente.</p>
                    <div className="bg-white p-8 rounded-sm shadow-sm mt-10">
                        <p className="text-gray-700 text-xl">
                                <span className="font-bold">Nombre: </span>
                                {cliente.nombre}
                            </p>
                            <p className="text-gray-700 text-xl mt-3">
                                <span className="font-bold">Email: </span>
                                {cliente.email}
                            </p>
                            {cliente.telefono && (
                                <p className="text-gray-700 text-xl mt-3">
                                <span className="font-bold">Teléfono: </span>
                                {cliente.telefono}
                            </p>
                            )}
                            <p className="text-gray-700 text-xl mt-3">
                                <span className="font-bold">Empresa: </span>
                                {cliente.empresa}
                            </p>
                            {cliente.observaciones && (
                                <p className="text-gray-700 text-xl mt-3">
                                <span className="font-bold">Observaciones: </span>
                                {cliente.observaciones}
                            </p>
                            )}
                    </div>
                </div>
            
        ) : (
            <p className="text-4xl font-bold text-blue-900">Sin resultados</p>
        )
  )

}

export default VerCliente