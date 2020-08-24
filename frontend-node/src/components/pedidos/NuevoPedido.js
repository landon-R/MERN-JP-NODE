import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";

const NuevoPedido = (props) => {
  const idx = props.match.params.id;

  const [cliente, setCliente] = useState({});
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const obtenerCliente = async () => {
    const res = await clienteAxios.get(`/clientes/${idx}`);
    setCliente(res.data);
  };

  useEffect(() => {
    obtenerCliente();

    // se encarga de actualizar el state del total
    actualizarTotal()
  }, [productos]);

  // almacenar la busqueda en el state
  const leerProducto = (e) => {
    setBusqueda(e.target.value);
  };

  // buscar los productos de busqueda
  const buscarProducto = async (e) => {
    e.preventDefault();
    if (!busqueda.length) {
      Swal.fire({
        icon: "warning",
        type: "warning",
        title: "escribe un producto",
        timer: 2500,
      });
    } else {
      //obtener los productos de la busqueda
      const resultado = await clienteAxios.post(
        `/productos/busqueda/${busqueda}`
      );
      console.log(resultado);
      if (resultado.data[0]) {
        let productoResultado = resultado.data[0];
        //agrega la llave producto y el id
        productoResultado.producto = resultado.data[0]._id;
        productoResultado.cantidad = 0;
        setProductos([...productos, productoResultado]);
      }
      if (!resultado.data.length) {
        Swal.fire({
          icon: "error",
          type: "error",
          title: "no hay resultados",
          timer: 2500,
        });
      }
    }
  };

  //actualizar el total a pagar
  const actualizarTotal = () => {
    // si los productos son cero , el total es cero
    if(productos.length === 0){
      setTotal(0)
      return
    }
    //calcular el nuevo total
    let nuevoTotal = 0

    //recorre todos los prodcutos y sus cantidades y precios  (+=) almacena toda la suma
    productos.map(e_producto => nuevoTotal+= (e_producto.cantidad * e_producto.precio))
    setTotal(nuevoTotal)
  }



  //almacena el pedido en la base de datos
  const realizarPedido = async (e) => {
    e.preventDefault()

    // pedido estructura de un obejto
    const pedido = {
      cliente: idx,
      pedido: productos,
      total: total
    }
    //almacenarlo en la base de datos
    const resultado = await clienteAxios.post('/pedidos', pedido)
    Swal.fire({
      icon: "success",
      type: "error",
      title: resultado.data.message,
      timer: 2500,
    });
  }

  return (
    <div>
      <h4 className="font-weight-bold ml-2">NUEVO PEDIDO</h4>
      <div
        className="px-3 py-1"
        style={{ backgroundColor: "#42424242", borderRadius: "20px" }}
      >
        <h5>Datos del Cliente</h5>
        <h5 className="font-weight-bold">
          Nombre: <span className="text-muted"> {cliente.nombre} </span>
        </h5>
        <h5 className="font-weight-bold">
          Empresa: <span className="text-muted"> {cliente.empresa} </span>
        </h5>
      </div>
      <hr style={{ border: "1px solid black" }} />
      <div>
        <h4 className="font-weight-bold">
          BUSCA UN PRODUCTO Y AGREGA UNA CANTIDAD{" "}
        </h4>
        <FormBuscarProducto
          leerProducto={leerProducto}
          buscarProducto={buscarProducto}
        />
      </div>
      <div>
        {productos.map((e_pro, index) => (
          <FormCantidadProducto
            key={e_pro.producto}
            e_pro={e_pro}
            productos={productos}
            setProductos={setProductos}
            index={index}
          />
        ))}
      </div>
      <hr style={{ border: "1px solid black" }} />
      <div>
        <p className="text-center h5">
          Total a pagar: <span>$ {total} </span>
        </p>

        {total > 0 && (
          <form
          onSubmit={realizarPedido}
          >
            <button type="submit" className="btn btn-info btn-block">
              Agregar Pedido
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NuevoPedido;
