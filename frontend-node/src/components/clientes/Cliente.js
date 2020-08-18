import React from "react";
import {Link} from 'react-router-dom'
import { Card, Button } from "react-bootstrap";
import { TiEdit, TiTrash } from "react-icons/ti";

const Cliente = ({ e_cli }) => {
  return (
    <Card className="my-2">
      <Card.Body>
        <div className="float-right d-flex flex-column">
          <Link to={`/clientes/editar/${e_cli._id}`} className="btn btn-info my-1">
            Editar Cliente <TiEdit className="mb-1" style={{width: "20px", height: "20px"}} />{" "}
          </Link>
          <Button variant="danger" className="my-1">
            Eliminar Cliente <TiTrash className="mb-1" style={{width: "20px", height: "20px"}} />{" "}
          </Button>
        </div>
        <h4 className="text-primary"> Nombre: {e_cli.nombre} </h4>
        <Card.Text>{e_cli.empresa} </Card.Text>
        <Card.Text>{e_cli.email} </Card.Text>
        <Card.Text>{e_cli.telefono} </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Cliente;
