import React, {useContext} from "react";
import {withRouter} from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
import {CRMContext} from '../context/CRMContext';

function Header(props) {

  const [auth, setAuth] = useContext(CRMContext)

  const cerrarSesion = () => {
    setAuth({
      token: "",
      auth: false
    })
    localStorage.removeItem('token', '')

    //redireccion a inciar sesion
    props.history.push('/iniciar-sesion')

  }


  return (
    <Navbar className="header" bg="dark" variant="dark">
    <div className="cabeza">
    <Navbar.Brand style={{marginLeft: "4em"}} > Administrador de Clientes</Navbar.Brand>
    {auth.auth ?  (
        <Nav className="float-right ml-3">
        <button  type="button" className="btn btn-danger " onClick={cerrarSesion} >Cerrar Sesion</button>
        </Nav>
    ) : null}
    </div>
    </Navbar>
  );
}

export default withRouter(Header);
