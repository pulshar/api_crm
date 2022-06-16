import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {


    const location = useLocation()
    const urlActual = location.pathname

  return (
    <div className='md:flex md:min-h-screen'>
        <div className="md:w-1/4 bg-blue-900 p-10" >
            <h2 className='text-4xl text-white font-bold text-center'>CRM Clientes</h2>
            <nav className="mt-10">
                <Link
                className={`${urlActual === '/clientes' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                to="/clientes"
                >Listado clientes</Link>

                <Link
                className={`${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                to="/clientes/nuevo"
                >Nuevo cliente</Link>

            </nav>
        </div>
        <div className="md:w-3/4 p-10 md:h-screen md:overflow-y-scroll" >
            <Outlet />
        </div>
    </div>
  )
}

export default Layout