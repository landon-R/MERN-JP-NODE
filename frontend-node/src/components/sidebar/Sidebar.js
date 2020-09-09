import React, {useContext} from "react";
import {FaUsers, FaClipboard, FaWeightHanging} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {CRMContext} from '../../context/CRMContext';
import "./Sidebar.scss";

const Sidebar = () => {

const [auth] = useContext(CRMContext)


if(!auth.auth) return null

  return (
    <div className="sidebar">
      <h4 className="mt-4 font-weight-bold" >Administracion</h4>
      <div className="grupo-link">
          <Link to="/" className="nav-link"> <FaUsers className="mb-1" />  Clientes</Link>
          <Link to="/productos" className="nav-link"> <FaWeightHanging className="mb-1"/> Productos</Link>
          <Link to="/pedidos" className="nav-link"> <FaClipboard className="mb-1"/> Pedidos</Link>
      </div>
    </div>
  );
};

export default Sidebar;
