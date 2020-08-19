import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const EditarProducto = (props) => {
    // id del cliente
  const idx = props.match.params.id;

  const [archivo, setArchivo] = useState("");

  const [dataProducto, setDataProducto] = useState({
    nombre: "",
    precio: "",
    imagen: ""
  });

  // destructurando dataproducto
const {nombre, precio, imagen} = dataProducto


  useEffect(() => {
    const apiProducto = async () => {
      const res = await clienteAxios.get(`/productos/${idx}`);
      console.log(res.data);
      setDataProducto(res.data)
    };
    apiProducto();
  }, []);

  const leerDataState = (e) => {
    setDataProducto({
      ...dataProducto,
      [e.target.name]: e.target.value,
    });
  };

  const leerArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };


  const guadardata = async (e) => {
    e.preventDefault();
    // formdata para subir archivos y string y number
    const formData = new FormData();
    formData.append("nombre", dataProducto.nombre);
    formData.append("precio", dataProducto.precio);
    formData.append("imagen", archivo);

    const res = await clienteAxios.put(`/productos/${idx}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log(res);
    try {
        Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1100
          })
          props.history.push('/productos')
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div>
      <Form onSubmit={guadardata}>
        <h4 className="font-weight-bold">EDITAR PRODUCTO </h4>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa Nombre"
            name="nombre"
            value={nombre}
            onChange={leerDataState}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            min="0"
            placeholder="Precio"
            name="precio"
            value={precio}
            onChange={leerDataState}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Imagen</Form.Label>
          <div style={{width: "35%"}} >
          {imagen && (<img src={`http://localhost:5000/${imagen}`} alt="lol" width="100%" /> )}
          </div>
          <Form.Control type="file" name="imagen" onChange={leerArchivo} />
        </Form.Group>

        <Button
          variant="primary"
          className="float-right"
          type="submit"
        >
          Actualizar Producto
        </Button>
      </Form>
    </div>
  );
};

export default EditarProducto;
