import React from "react";
import {FaUsers, FaClipboard, FaWeightHanging} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Administracion</h3>
      <div className="grupo-link">
          <Link to="/" className="nav-link"> <FaUsers className="mb-1" />  Clientes</Link>
          <Link to="/" className="nav-link"> <FaWeightHanging className="mb-1"/> Productos</Link>
          <Link to="/" className="nav-link"> <FaClipboard className="mb-1"/> Pedidos</Link>
      </div>
    </div>
  );
};

export default Sidebar;
