import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import clienteAxios from "../../config/axios";

const NuevoCliente = (props) => {

  const [dataCliente, setDataCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });


  const cargarDatos = (e) => {
    setDataCliente({
      ...dataCliente,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, apellido, empresa, email, telefono } = dataCliente;


  // para activar el button de crear cliente
  const validarCliente = () => {
    let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length
    return valido
  }

  // guardar los datos en la base de datos
  const guardarCliente = async (e) => {
    e.preventDefault();
    await clienteAxios.post("/clientes", dataCliente).then((res) => {
        if (res.data.code === 11000) {
            Swal.fire(
                'Hubo un Error!',
                `El email ya existe`,
                'error'
              )
        } else {
            console.log(res);
            Swal.fire(
                `${res.data.message}`,
                'You clicked the button!',
                'success'
              )
            }
            props.history.push('/')  
    });
    // setDataCliente({
    //   nombre: "",
    //   apellido: "",
    //   empresa: "",
    //   email: "",
    //   telefono: "",
    // });
  };

  return (
    <div>
      <h3>Nuevo Cliente</h3>
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
        <Button variant="primary" type="submit" disabled={validarCliente()} >
          Crear Nuevo Cliente
        </Button>
      </Form>
    </div>
  );
};

export default NuevoCliente;
