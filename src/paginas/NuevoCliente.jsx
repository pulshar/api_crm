import Formulario from "../components/Formulario"


const NuevoCliente = () => {
  return (
    <>
        <h1 className="text-4xl font-bold text-blue-900">Nuevo Cliente</h1>
        <p className="mt-3">Rellena el formulario para registrar un nuevo cliente.</p>
        <Formulario />
    </>
  )
}

export default NuevoCliente