
import { useNavigate } from "react-router-dom"

const Cliente = ( {cliente, handleSubmitEliminar}) => {

    const { nombre, empresa, email, telefono, observaciones, id } = cliente

    const navigate = useNavigate()

    const handleSubmitVer = () => {
        navigate('/clientes/'+ id)
    }
    const handleSubmitEditar = () => {
        navigate('/clientes/editar/'+ id)
    }
    const mystyle = {
        minHeight: "75px",
    }

  return (
    <tr className="border-b hover:bg-gray-50">
        <td className="p-3">{nombre}</td>
        <td className="p-3">{empresa}</td>
        <td className="p-3">
            <p>{email}</p>
            { telefono &&
                <p>{telefono}</p>
             }
        </td>    
        <td className="p-3 flex justify-center items-center gap-3" style={mystyle} >
        <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 rounded-sm px-3 py-1 font-bold uppercase text-xs"
            onClick={handleSubmitVer}
            >Ver</button>
            <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-sm px-3 py-1 font-bold uppercase text-xs"
            onClick={handleSubmitEditar}
            >Editar</button>
            <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white rounded-sm px-3 py-1 font-bold uppercase text-xs"
            onClick={() => handleSubmitEliminar(id)}
            >Eliminar</button>
        </td>    
    </tr>
  )
}

export default Cliente 