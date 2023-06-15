import { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {
    const { auth, actualizarPerfil } = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault()
        const { nombre, email } = perfil

        if ([nombre, email].includes('')) {
            setAlerta({ msg: 'nombre y correo son obligatorios', error: true })
            return
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)

    }

    return (
        <>
            <AdminNav />
            <h2 className='font-black text-3xl text-center mt-10'>Editar perfil</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu
                <span className='text-indigo-600 font-bold'> información aquí</span>
            </p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                    {alerta.msg && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit}>
                        <div className='my-3'>
                            <label className='uppercase font-bold text-gray-600'>
                                Nombre
                            </label>
                            <input
                                type="text"
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name='nombre'
                                //lo unico que se me ocurre es que lanza el error de uncontrolled input bc puede que en algun punto sea undefined, so, necesitamos prevenir que pudiera ser undefined
                                value={perfil.nombre || ''}

                                //seteamos a perfil con una copia de la data que ya tiene pero sobre escribimos la propiedad nombre
                                //con esa sintaxis estamos accediendo a la propiedad name del input ya que el valor de esta es nombre
                                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className='my-3'>
                            <label className='uppercase font-bold text-gray-600'>
                                Sitio web
                            </label>
                            <input
                                type="text"
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name='web'
                                value={perfil.web || ''}
                                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className='my-3'>
                            <label className='uppercase font-bold text-gray-600'>
                                Telefono
                            </label>
                            <input
                                type="text"
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name='telefono'
                                value={perfil.telefono || ''}
                                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className='my-3'>
                            <label className='uppercase font-bold text-gray-600'>
                                Email
                            </label>
                            <input
                                type="text"
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                name='email'
                                value={perfil.email || ''}
                                onChange={e => setPerfil({ ...perfil, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <input
                            type="submit"
                            value='Guardar cambios'
                            className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5'
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil