import React from 'react'
import {Navbar} from 'react-bootstrap'

function Header() {
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home"  style={{marginLeft: "6em"}} >Administrador de Clientes</Navbar.Brand>
      </Navbar>
    )
}

export default Header
