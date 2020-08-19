import React from "react";
import {Link} from 'react-router-dom'
import { Card, Button } from "react-bootstrap";
import { TiEdit, TiTrash } from "react-icons/ti";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2'
import './cliente.scss'

const Cliente = ({ e_cli, obtenerClientes }) => {


  const eliminarCliente = async (id) => {

    Swal.fire({
      title: 'Esta Seguro?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar Cliente!',

      //personaliza sweetalert2
      customClass: {
        popup: "popup-classx",
        actions: 'actions-class',
        confirmButton: 'confirm-button-class',
        cancelButton: 'cancel-button-class',
      }

    }).then(async (result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
          )
          //elimina
         await clienteAxios.delete(`/clientes/${id}`)
        obtenerClientes()
      }
    })
  }

  return (
    <Card className="my-2">
      <Card.Body>
        <div className="float-right d-flex flex-column">
          <Link to={`/clientes/editar/${e_cli._id}`} className="btn btn-info my-1">
            Editar Cliente <TiEdit className="mb-1" style={{width: "20px", height: "20px"}} />{" "}
          </Link>
          <Button variant="danger" className="my-1" onClick={()=> eliminarCliente(e_cli._id)} >
            Eliminar Cliente <TiTrash className="mb-1" style={{width: "20px", height: "20px"}} />{" "}
          </Button>
        </div>
        <h4 className="text-primary">{e_cli.nombre} </h4>
        <Card.Text style={{fontWeight: "bold"}} >{e_cli.empresa} </Card.Text>
        <Card.Text>{e_cli.email} </Card.Text>
        <Card.Text> Tel: {e_cli.telefono} </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Cliente;
