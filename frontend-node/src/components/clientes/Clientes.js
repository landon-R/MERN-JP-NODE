import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Spinner} from 'react-bootstrap';
import { MdPersonAdd } from "react-icons/md";
import clienteAxios from "../../config/axios";
import Cliente from "./Cliente";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  const obtenerClientes = async () => {
    const res = await clienteAxios.get("/clientes");
    setClientes(res.data);
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

    // poner spinner
    if(!clientes.length) {
      return (
          <div className=" d-flex justify-content-center h-100 align-items-center" >
              <Spinner animation="border" variant="primary"  style={{width: "3em", height: "3em"}} />
              <h4 className="ml-1" > Cargando... </h4>
          </div>
      )
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
      <div className="mt-4">
        {clientes.map((e_cli) => (
          <Cliente key={e_cli._id} e_cli={e_cli} obtenerClientes={obtenerClientes} />
        ))}
      </div>
    </div>
  );
};

export default Clientes;
