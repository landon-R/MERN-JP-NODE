import React from "react";
import Swal from 'sweetalert2';
import { Card, Button, ListGroup } from "react-bootstrap";
import clienteAxios from "../../config/axios";

const Pedido = ({ e_pe }) => {


    const eliminarPedido = async (id) => {
        
        try {
            const res = await clienteAxios.delete(`/pedidos/${id}`)
            Swal.fire({
                icon: "warning",
                type: "warning",
                title: "escribe un producto",
                timer: 2500,
              });
        } catch (error) {
            console.log(error);
        }
    }

  return (
      <Card className="my-3"  style={{border: "1px solid black"}} >
        <Card.Header>
          <span className="font-weight-bold h5">
            {" "}
            Cliente: {e_pe.cliente.nombre}
          </span>
          <span className="float-right">ID: {e_pe._id}</span>
        </Card.Header>
        <Card.Body>
          <div className="float-right d-flex flex-column">
            <Button className="mb-2" variant="primary">
              Go somewhere
            </Button>
            <Button variant="danger" onClick={()=> eliminarPedido(e_pe._id)} >Eliminar</Button>
          </div>
          <div>
            <h4 className="text-center" >Articulos del Pedido</h4>
            {e_pe.pedido.map((pedido) => (
                <PedidoProducto key={pedido._id} pedido={pedido} />
                ))}
          </div>
                <h5 className="float-right font-weight-bold mr-3" >Total: ${e_pe.total} </h5>
        </Card.Body>
      </Card>
  );
};
export default Pedido;

function PedidoProducto({pedido}) {

console.log(pedido.producto);

  return (
    <ListGroup style={{width: "80%", paddingBottom: "0.5em"}} as="ul">
      <ListGroup.Item  variant="info" as="li" >
      {pedido.producto.nombre}
      </ListGroup.Item>
      <ListGroup.Item as="li">Precio: ${pedido.producto.precio} </ListGroup.Item>
      <ListGroup.Item as="li">Cantidad: {pedido.cantidad}</ListGroup.Item>
    </ListGroup>
  );
}
