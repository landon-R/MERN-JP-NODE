import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import {CRMContext} from '../../context/CRMContext'
import "./auth.scss";

function Login(props) {

  const [auth, setAuth] = useContext(CRMContext)

  console.log(auth);

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  //almacenar lo que el usuario escriba en el state
  const leerDatos = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };


  const iniciarSesion = async (e) => {
      e.preventDefault()

      try {
          const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales)
          
          //extraer el token y colocarlo en localstorage
          const { token } = respuesta.data
          localStorage.setItem('token', token)

          //ponerlo en el state 
          setAuth({
            auth: true,
            token
          })

          //modal de alerta
          Swal.fire({
              icon: "success",
            title:"login correcto",
            text:"has Iniciado sesion",
            
          })

          props.history.push('/')

      } catch (error) {
          console.log(error);
          Swal.fire({
              type: "error",
              title: "hubo un error",
              text: error.response.data.message
            })
      }
  }

  return (
    <div className="login">
      <div className="login-interno">
        <Form onSubmit={iniciarSesion} >
          <h3 className="text-center">INICIAR SESION</h3>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              name="email"
              onChange={leerDatos}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={leerDatos}
            />
          </Form.Group>
          <Button  style={{borderRadius: "20px"}} block variant="primary" type="submit">
            Login User
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
