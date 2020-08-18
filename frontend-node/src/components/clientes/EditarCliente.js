import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import clienteAxios from "../../config/axios";


const EditarCliente = (props) => {

  const [dataCliente, setDataCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

const user = async () => {
    const res = await clienteAxios.get(`/clientes/${props.match.params.id}`)
    setDataCliente(res.data)
}


useEffect(() => {
  user()
}, [])

  const cargarDatos = (e) => {
    setDataCliente({
      ...dataCliente,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, apellido, empresa, email, telefono } = dataCliente;


  // guardar los datos en la base de datos
  const guardarCliente = async (e) => {
    e.preventDefault();
    await clienteAxios.put(`/clientes/${props.match.params.id}`, dataCliente).then((res) => {
        console.log(res);
        if (res.data.code === 11000) {
            Swal.fire(
                'Hubo un Error!',
                `El email ya existe`,
                'error'
              )
        } else {
            console.log(res);
            Swal.fire(
                'cliente updates successfully',
                'You clicked the button!',
                'success'
              )
            }
            props.history.push('/')  
    });

  };

  return (
    <div>
      <h3>Editar Cliente</h3>
      <Form onSubmit={guardarCliente}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu Nombre"
            name="nombre"
            onChange={cargarDatos}
            value={nombre}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu apellido"
            name="apellido"
            onChange={cargarDatos}
            value={apellido}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Empresa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu Empresa"
            name="empresa"
            onChange={cargarDatos}
            value={empresa}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu Email"
            name="email"
            onChange={cargarDatos}
            value={email}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu Telefono"
            name="telefono"
            onChange={cargarDatos}
            value={telefono}
          />
        </Form.Group>
        <Button variant="primary" type="submit" >
          Crear Nuevo Cliente
        </Button>
      </Form>
    </div>
  );
};

export default EditarCliente;
