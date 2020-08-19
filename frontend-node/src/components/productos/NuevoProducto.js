import React, { useState } from "react";
import Swal from 'sweetalert2'
import { Form, Button } from "react-bootstrap";
import clienteAxios from "../../config/axios";

const NuevoProducto = (props) => {
  const [dataProducto, setDataProducto] = useState({
    nombre: "",
    precio: "",
  });

  const [archivo, setArchivo] = useState("");

  const leerDataState = (e) => {
    setDataProducto({
      ...dataProducto,
      [e.target.name]: e.target.value,
    });
  };

  const leerArchivo = (e) => {
        setArchivo(e.target.files[0])
  }


  const ativoBoton = () => {
      let red = !dataProducto.nombre.length || !dataProducto.precio.length
      return red
  }

  const guadardata = async (e) => {
    e.preventDefault();

    // formdata para subir archivos y string y number
    const formData = new FormData()
    formData.append('nombre', dataProducto.nombre)
    formData.append('precio', dataProducto.precio)
    formData.append('imagen', archivo)

    try {
        const res = await clienteAxios.post("/productos", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res);
        Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          props.history.push('/productos')
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="p-3">
      <Form onSubmit={guadardata}>
        <h4 className="font-weight-bold">REGISTRA NUEVO PRODUCTO </h4>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa Nombre"
            name="nombre"
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
            onChange={leerDataState}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" name="imagen" onChange={leerArchivo} />
        </Form.Group>

        <Button variant="primary" className="float-right" type="submit" disabled={ativoBoton()} >
          Nuevo Producto
        </Button>
      </Form>
    </div>
  );
};

export default NuevoProducto;
