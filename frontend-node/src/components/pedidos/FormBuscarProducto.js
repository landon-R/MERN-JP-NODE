import React from "react";

const FormBuscarProducto = (props) => {
  return (
    <div className="d-flex justify-content-center my-3">
      <form onSubmit={props.buscarProducto} className="col-7">
        <div className="form-group">
          <label className="form-check-label">Producto </label>
          <input
            className="form-control"
            type="text"
            placeholder="nombre de productos"
            onChange={props.leerProducto}
          />
        </div>
        <input className="btn btn-primary btn-block" type="submit"  value="Buscar Producto" />
      </form>
    </div>
  );
};

export default FormBuscarProducto;
