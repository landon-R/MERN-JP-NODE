import React from 'react'
import { Link } from "react-router-dom";
import {Card, Button} from 'react-bootstrap'
import Swal from 'sweetalert2'
import clienteAxios from "../../config/axios";
import noImagen from '../../img/notimagen.jpg'

const Producto = ({e_pro, apiProductos}) => {


    const eliminarProducto = async (id) => {
      try {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',

           //personaliza sweetalert2
          customClass: {
        popup: "popup-classx",
        actions: 'actions-class',
        confirmButton: 'confirm-button-class',
        cancelButton: 'cancel-button-class',
      }
      
        }).then( async (result) => {
          if (result.value) {
           
           const ref = await clienteAxios.delete(`/productos/${id}`) 
           if(ref.status === 200) {
            Swal.fire(
              'Deleted!',
              ref.data.message,
              'success'
            )
            apiProductos()
           }

          }
        })
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <Card className="m-1"  style={{ width: '16rem'}}>
       {e_pro.imagen? (
            <Card.Img variant="top" src={`http://localhost:5000/${e_pro.imagen}`} />
       ): (
        <Card.Img variant="top" src={noImagen} />
       )}
        <Card.Body style={{padding: "0.8em 1em"}} >
          <Card.Title> {e_pro.nombre} </Card.Title>
          <p>
          $ {e_pro.precio}
          </p>
        <div className=" d-flex  justify-content-around" >
        <Link to={`/productos/editar/${e_pro._id}`} className="btn btn-info" >Editar</Link>
          <Button variant="danger" onClick={()=> eliminarProducto(e_pro._id)} >Eliminar</Button>
        </div>
        </Card.Body>
      </Card>
    )
}

export default Producto
