import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import Pedido from "./Pedido";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  const obtenerPedidos = async () => {
    const res = await clienteAxios.get("/pedidos");
    console.log(res.data);
    setPedidos(res.data);
  };

  useEffect(() => {
    obtenerPedidos();
  }, []);

  return (
    <div>
      <h4 className="font-weight-bold" >PEDIDOS</h4>
      {pedidos.map((e_pe) => (
        <Pedido key={e_pe._id} e_pe={e_pe} />
      ))}
    </div>
  );
};

export default Pedidos;
