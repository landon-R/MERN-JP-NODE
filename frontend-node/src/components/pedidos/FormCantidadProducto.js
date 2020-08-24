import React from "react";
import { GrFormSubtract, GrFormAdd } from "react-icons/gr";

const FormCantidadProducto = ({e_pro, productos, setProductos, index}) => {


  //suma numero
  const aumenta = (i) => {
    const todosProductos = [...productos]

    //incremento
    todosProductos[i].cantidad++;
    setProductos(todosProductos)
  };

  //resta numeros
  const resta = (i) => {
    const todosProductos = [...productos]
    // validar si esta en 0 no puede ir mas alla
    if(todosProductos[i].cantidad === 0) return

    //decremento resta numero (--  =  -1)
    todosProductos[i].cantidad--;
    setProductos(todosProductos)
 
  };


  const removerProducto = (id) => {
    console.log(id);
    const todosProductos = productos.filter(pro => pro._id !== id)
    setProductos(todosProductos)
  }

  return (
    <div className="row  p-2">
      <div className="col-6 p-3 text-center">
        <h4>{e_pro.nombre} </h4>
        <h4>${e_pro.precio} </h4>
      </div>
      <div className="col-6 text-center">
        <GrFormSubtract
          className="mb-1"
          style={{ backgroundColor: "#bbe1fa", fontSize: "1.8em" }}
          onClick={() => resta(index)}
        />
        <span
          className="text-center"
          style={{ padding: "0.25em 3em", border: "1px solid black" }}
        >
          {e_pro.cantidad}
        </span>

        <GrFormAdd
          className="mb-1"
          style={{ backgroundColor: "#bbe1fa", fontSize: "1.8em" }}
          onClick={() => aumenta(index)}
        />
        <div className="mt-2">
          <button
            className="btn btn-danger"
            onClick={() => removerProducto(e_pro.producto)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCantidadProducto;
