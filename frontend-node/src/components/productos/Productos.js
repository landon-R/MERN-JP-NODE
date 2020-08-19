import React, { useState, useEffect } from 'react'
import Spinnerx from '../../layout/spinner/Spinnerx';
import { Link } from "react-router-dom";
import { MdPersonAdd } from "react-icons/md";
import clienteAxios from "../../config/axios";
import Producto from './Producto';

const Productos = () => {

    const [productos, setProductos] = useState([])

    const apiProductos = async () => {
        const res = await clienteAxios.get('/productos')
        setProductos(res.data)
    }

    useEffect(() => {
      apiProductos()
    }, [])

       // poner spinner
       if(!productos.length) {
        return (
            <div className=" d-flex justify-content-center h-100 align-items-center" >
                <Spinnerx/>
            </div>
        )
    }

    return (
        <div>
             <Link to="/productos/nuevo" className="btn btn-outline-info float-right">
        {" "}
        <MdPersonAdd
          style={{ width: "20px", height: "20px" }}
          className="mb-1"
        />{" "}
        Nuevo Producto
      </Link>
            <h4 className="font-weight-bold" >LISTA DE PRODUCTOS</h4>
            <div className="row mt-4" >
                {productos.map(e_pro => (
                    <Producto key={e_pro._id} e_pro={e_pro} apiProductos={apiProductos} />
                ))}
            </div>
        </div>
    )
}

export default Productos
