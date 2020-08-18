import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdPersonAdd } from "react-icons/md";
import clienteAxios from "../../config/axios";
import Cliente from "./Cliente";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  const obtenerClientes = async () => {
    const res = await clienteAxios.get("/clientes");
    console.log(res.data);
    setClientes(res.data);
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

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
          <Cliente key={e_cli._id} e_cli={e_cli} />
        ))}
      </div>
    </div>
  );
};

export default Clientes;
