import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Clientes from "./components/clientes/Clientes";
import Productos from "./components/productos/Productos";
import Pedidos from "./components/pedidos/Pedidos";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL);

  return (
    <div className="contenedor">
      <BrowserRouter>
        <Header />
      
      <Sidebar />
        <div className="main" >
          <div className="main-interno" >
          <Switch>
            <Route exact={true} path="/" component={Clientes} />
            <Route exact={true} path="/clientes/nuevo" component={NuevoCliente} />
            <Route exact={true} path="/clientes/editar/:id" component={EditarCliente} />
            <Route exact={true} path="/productos" component={Productos} />
            <Route exact={true} path="/pedidos" component={Pedidos} />
          </Switch>
          </div>
        </div>
    
      </BrowserRouter>
    </div>
  );
}

export default App;
