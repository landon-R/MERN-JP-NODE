import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { MdPersonAdd } from "react-icons/md";
import clienteAxios from "../../config/axios";
import Cliente from "./Cliente";
import {CRMContext} from '../../context/CRMContext';

const Clientes = (props) => {

  //utilizar valores del context
  const [auth, setAuth] = useContext(CRMContext)

  
  //state del cliente
  const [clientes, setClientes] = useState([]);

  //obtener clientes de la API
  const obtenerClientes = async () => {
   if(auth.token !== '') {

    try {
      const res = await clienteAxios.get("/clientes", {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setClientes(res.data);
    } catch (error) {
      //erroe con autorizacion
      if(error.response.status = 500) {
        props.history.push('/iniciar-sesion')
      }
    }

   } else {
    props.history.push('/iniciar-sesion')
   }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  if(!auth.token) {
    props.history.push('/iniciar-sesion')
  }


  return (
    <div className="clientes">
      <Link to="/clientes/nuevo" className="btn btn-outline-info float-right">
        {" "}
        <MdPersonAdd
          style={{ width: "20px", height: "20px" }}
          className="mb-1"
        />{" "}
        Nuevo Cliente
      </Link>
      <h4 className="font-weight-bold ml-3">CLIENTES</h4>
      <div>
        {!clientes.length ? (
          <div className=" d-flex justify-content-center h-100 align-items-center">
            <Spinner
              animation="border"
              variant="primary"
              style={{ width: "3em", height: "3em" }}
            />
            <h4 className="ml-1"> Cargando... </h4>
          </div>
        ) : (
          <div className="mt-4">
            {clientes.map((e_cli) => (
              <Cliente
                key={e_cli._id}
                e_cli={e_cli}
                obtenerClientes={obtenerClientes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Clientes);
