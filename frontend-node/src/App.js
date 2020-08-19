import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Sidebar from "./components/sidebar/Sidebar";
//routes
import Pedidos from "./components/pedidos/Pedidos";
import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";
import Productos from "./components/productos/Productos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";

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
            <Route exact={true} path="/productos/nuevo" component={NuevoProducto} />
            <Route exact={true} path="/productos/editar/:id" component={EditarProducto} />

            <Route exact={true} path="/pedidos" component={Pedidos} />
          </Switch>
          </div>
        </div>
    
      </BrowserRouter>
    </div>
  );
}

export default App;
