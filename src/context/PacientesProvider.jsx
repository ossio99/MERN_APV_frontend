import { createContext, useEffect, useState } from 'react'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth'

const PacientesContext = createContext()

export const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([])
    //estado exclusivo para setEditarPaciente
    //ya que el formulario validara si este estado tiene data entonces estamos editando
    const [paciente, setPaciente] = useState({})

    const { auth } = useAuth()

    //obtenemos los pacientes de la db solo una vez
    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/pacientes', config)
                setPacientes(data)
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes()
    //para que cargue los pacientes cuando el usuario cambia
    // }, [])
    }, [auth])

    const guardarPaciente = async paciente => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        //si la data tiene id significa que queremos actualizar
        //esto porque id se crea cuando se almacena en la db
        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

                //si el id del paciente actual es igual a el id del paciente de la db entonces le devolvemos al arreglo el de la db (que ya estaría updated)
                //de lo contrario le devolvemos al array el del state
                //con lo que en el new array tendra los mismos pacientes del state menos el updated
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error);
            }
        //de lo contrario queremos crear
        } else {
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                // console.log(data);
                //creamos un nuevo obj que tendra todas las props de data menos las que se extrajeron
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error);
            }
        }
    }

    const setEdicion = paciente => {
        setPaciente(paciente)
    }

    const eliminarPaciente = id => {
        //alerta de sweet alert
        Swal.fire({
            title: '¿Seguro que deseas eliminar el paciente?',
            text: "No podras revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#4f46e5',
            confirmButtonText: 'Si, eliminar'
        }).then(async result => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado',
                    'El paciente ha sido eliminado',
                    'success'
                )
            }
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter(pacienteState => {
                    return pacienteState._id !== id
                })
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error);
            }
        })
    }

    return (
        <PacientesContext.Provider value={{ pacientes, guardarPaciente, setEdicion, paciente, eliminarPaciente }}>
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext