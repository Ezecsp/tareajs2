class Producto {
    constructor(sku, nombre, precio, categoria, stock = 10) {
      this.sku = sku;
      this.nombre = nombre;
      this.categoria = categoria;
      this.precio = precio;
      this.stock = stock;
    }
  }
  
  class ProductoEnCarrito extends Producto {
    constructor(sku, nombre, cantidad) {
      super(sku, nombre);
      this.cantidad = cantidad;
    }
  }
  
  const productosDelSuper = [
    new Producto("KS944RUR", "Queso", 10, "lacteos", 4),
    new Producto("FN312PPE", "Gaseosa", 5, "bebidas"),
    new Producto("PV332MJ", "Cerveza", 20, "bebidas"),
    new Producto("XX92LKI", "Arroz", 7, "alimentos", 20),
    new Producto("UI999TY", "Fideos", 5, "alimentos"),
    new Producto("RT324GD", "Lavandina", 9, "limpieza"),
    new Producto("OL883YE", "Shampoo", 3, "higiene", 50),
    new Producto("WE328NJ", "Jabon", 4, "higiene", 3)
  ];
  
  class Carrito {
    constructor() {
      this.productos = [];
      this.categorias = [];
      this.precioTotal = 0;
    }
  
    async agregarProducto(sku, cantidad) {
      console.log(`Agregando ${cantidad} ${sku}`);
  
      const producto = productosDelSuper.find((producto) => producto.sku === sku);
  
      if (!producto) {
        console.log(`Producto ${sku} no encontrado`);
        return;
      }
  
      const productoExistente = this.productos.find((producto) => producto.sku === sku);
  
      if (productoExistente) {
        productoExistente.cantidad += cantidad;
      } else {
        const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
        this.productos.push(nuevoProducto);
  
        const categoriaExistente = this.categorias.find((categoria) => categoria === producto.categoria);
  
        if (!categoriaExistente) {
          this.categorias.push(producto.categoria);
        }
      }
  
      this.precioTotal += producto.precio * cantidad;
    }
  
    eliminarProducto(sku, cantidad) {
      return new Promise((resolve, reject) => {
        const productoExistente = this.productos.find((producto) => producto.sku === sku);
  
        if (!productoExistente) {
          reject(`El producto ${sku} no existe en el carrito`);
          return;
        }
  
        if (productoExistente.cantidad > cantidad) {
          productoExistente.cantidad -= cantidad;
        } else {
          const index = this.productos.indexOf(productoExistente);
          this.productos.splice(index, 1);
        }
  
        this.precioTotal -= productoExistente.precio * cantidad;
        resolve(`Se ha eliminado ${cantidad} unidades del producto ${sku} del carrito`);
      });
    }
  }
  
  const carrito = new Carrito();
  carrito.agregarProducto("WE328NJ", 2);
  
  carrito
    .eliminarProducto("WE328NJ", 1)
    .then((mensaje) => console.log(mensaje))
    .catch((error) => console.error(error));
  