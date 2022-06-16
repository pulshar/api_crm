import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom'
import Loader from './Loader';
import * as Yup from 'yup';
import Alert from './Alert';

const Formulario = ( { cliente, cargando }) => {
    
    const navigate = useNavigate()
    const clienteSchema =  Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio')
                    .min(3, 'El nombre es muy corto'),
        empresa: Yup.string().required('¿Tu empresa?'),
        email: Yup.string().required('El email es obligatorio').email('Email no válido'),
        telefono: Yup.number().integer().positive('Número no válido').typeError('Introduce solo números'),
        observaciones: Yup.string().min(5, 'Escribe algo con sentido'),
      });

      const handleSubmit = async valores => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/${cliente?.id ?? ""}`
 
            const respuesta = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: `${cliente?.id ? "PUT" : "POST"}`,
                body: JSON.stringify(valores),
            });
            await respuesta.json()
            navigate("/clientes");
        } catch (e) {
            console.log(e);
        }
    };

    // const handleSubmit = async (valores) => {
        
    //     try {
    //         let respuesta

    //         if(cliente.id) {
    //             // editando registro
    //             const url = 'http://localhost:4000/clientes/' + cliente.id
    //             respuesta = await fetch(url, {
    //                 method: 'PUT',
    //                 body: JSON.stringify(valores),
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })

    //         } else {
    //             // nuevo registro
    //             const url = 'http://localhost:4000/clientes/'
    //             respuesta = await fetch(url, {
    //                 method: 'POST',
    //                 body: JSON.stringify(valores),
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //         }

    //          await respuesta.json()
    //          navigate('/clientes')


    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

  return (

    cargando ? <div className='mt-10'><Loader /></div> : (
        <div className="bg-white mt-10 px-6 py-10 pt-8 rounded-md shadow-md md:w-3/4">
            {/* <h1 className="text-gray-600 mb-5 text-center text-xl font-bold">Agregar cliente</h1> */}
            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    observaciones: cliente?.observaciones ?? '',
                }}
                enableReinitialize={true}

                onSubmit={ async (values, { resetForm }) => {
                    await handleSubmit(values)
                    resetForm()
                }}

                validationSchema={clienteSchema}
            >

                {({ errors, touched }) => (
                    <Form>
                        <div className='mb-4'>
                            <label className="text-gray-800" htmlFor='nombre'>Nombre</label>
                            <Field 
                                id="nombre"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-100 border border-gray-300 rounded-sm"
                                placeholder="Nombre del cliente"
                                name="nombre"
                            />
                            { errors.nombre && touched.nombre ? (
                                    <Alert
                                        mensaje={errors.nombre}
                                    /> ) : null }
                        </div>
                        <div className='mb-4'>
                            <label className="text-gray-800" htmlFor='empresa'>Empresa</label>
                            <Field 
                                id="empresa"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-100 border border-gray-300 rounded-sm"
                                placeholder="Empresa del cliente"
                                name="empresa"
                            />
                            { errors.empresa && touched.empresa ? (
                                    <Alert
                                        mensaje={errors.empresa}
                                    /> ) : null }
                        </div>
                        <div className='mb-4'>
                            <label className="text-gray-800" htmlFor='email'>Email</label>
                            <Field 
                                id="email"
                                type="email"
                                className="mt-2 block w-full p-3 bg-gray-100 border border-gray-300 rounded-sm"
                                placeholder="Email del cliente"
                                name="email"
                            />
                            { errors.email && touched.email ? (
                                    <Alert
                                        mensaje={errors.email}
                                    /> ) : null }
                        </div>
                        <div className='mb-4'>
                            <label className="text-gray-800" htmlFor='telefono'>Teléfono</label>
                            <Field 
                                id="telefono"
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray-100 border border-gray-300 rounded-sm"
                                placeholder="Teléfono del cliente"
                                name="telefono"
                            />
                            { errors.telefono && touched.telefono ? (
                                    <Alert
                                        mensaje={errors.telefono}
                                    /> ) : null }
                        </div>
                        <div className='mb-4'>
                            <label className="text-gray-800" htmlFor='observaciones'>Observaciones</label>
                            <Field 
                                as="textarea"
                                id="observaciones"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-100 border border-gray-300 rounded-sm"
                                placeholder="Observaciones, notas..."
                                rows="5"
                                name="observaciones"
                            />
                        </div>
                        <input
                            type="submit"
                            value={ cliente?.nombre ? 'Editar cliente' : 'Agregar cliente' }
                            className="p-3 text-white bg-blue-800 w-full uppercase font-bold rounded-sm mt-5 text-lg cursor-pointer"
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}
export default Formulario