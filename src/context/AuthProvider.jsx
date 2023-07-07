import React, { createContext, useEffect, useState } from 'react'
import clienteAxios from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const res = await clienteAxios('/veterinarios/perfil', config)
                setAuth(res.data)
            } catch (error) {
                console.log(error);
                setAuth({})
            }

            setCargando(false)
        }


        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
        //innecesario ya que cargando se setea como true al recargar la pag pero tambien se ejecuta el useEffect que setea cargando como false
        // setCargando(false)
    }

    const actualizarPerfil = async datos => {

        const token = localStorage.getItem('token')

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(`/veterinarios/perfil/${datos._id}`, datos, config)

            setAuth(data)

            return {
                msg: 'Almacenado correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async datos => {
        // console.log(datos);
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(`/veterinarios/actualizar-password`, datos, config)
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, cargando, cerrarSesion, actualizarPerfil, guardarPassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext