import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"
import { Link } from "react-router-dom"

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    const { id } = useParams()
    // const params = useParams()
    // const { id } = params

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const res = await clienteAxios(`/veterinarios/confirmar/${id}`)
                setCuentaConfirmada(true)
                
                // console.log(res);
                setAlerta({
                    msg: res.data.msg,
                    error: false
                })
            } catch (error) {
                // console.log(error);
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }

        setCargando(false)
        confirmarCuenta()
    }, [])


    return (
        <>
            <div>
				<h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y comienza a administrar tus <span className="text-black">pacientes</span></h1>
			</div>
			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!cargando && <Alerta  alerta={alerta} />}

                {cuentaConfirmada && (
                    <Link
                    className="block text-center my-5 text-gray-500"
                    to='/'>Iniciar sesion</Link>
                )}
            </div>
        </>
    )
}

export default ConfirmarCuenta