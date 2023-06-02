import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      recuperado: false,
      nuevoProducto: {
        codigo: '',
        descripcion: '',
        precio: ''
      }
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/producto')
      .then((response) => {
        return response.json();
      })
      .then((prod) => {
        this.setState({ productos: prod, recuperado: true });
      });
  }

  agregarProducto = () => {
    const { productos, nuevoProducto } = this.state;
    const nuevoProductos = [...productos, nuevoProducto];
    this.setState({ productos: nuevoProductos, nuevoProducto: { codigo: '', descripcion: '', precio: '' } });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      nuevoProducto: {
        ...prevState.nuevoProducto,
        [name]: value
      }
    }));
  };

  componentDidMount() {
    fetch('http://127.0.0.1:8000/producto')
      .then((response) => {
        return response.json();
      })
      .then((prod) => {
        console.log(prod); // Imprimir los datos en la consola
        this.setState({ productos: prod, recuperado: true });
      });
  }

  mostrarTabla() {
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productos.map((prod) => {
              return (
                <tr key={prod.codigo}>
                  <td>{prod.codigo}</td>
                  <td>{prod.descripcion}</td>
                  <td>{prod.precio}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h2>Agregar Nuevo Producto</h2>
          <input
            type="text"
            name="codigo"
            placeholder="Código"
            value={this.state.nuevoProducto.codigo}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={this.state.nuevoProducto.descripcion}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="precio"
            placeholder="Precio"
            value={this.state.nuevoProducto.precio}
            onChange={this.handleChange}
          />
          <button onClick={this.agregarProducto}>Agregar</button>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.recuperado) {
      return this.mostrarTabla();
    } else {
      return <div>Recuperando datos...</div>;
    }
  }
}

export default App;
