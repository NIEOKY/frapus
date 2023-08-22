export interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface ProductoVenta {
  nombre: string;
  precio: number;
}

export interface ProductoVentaState {
  productos: ProductoVenta[];
}

export interface Cuenta {
  productos: Producto[];
  fecha: string;
}

export interface AppState {
  cuenta: {
    productos: Producto[];
    fecha: string; // Cambiar a string si ya has ajustado el tipo Cuenta
  };
}

export interface PedidosState {
  pedidos: Pedido[];
}

export interface Pedido {
  cuenta: Cuenta;
  total: number;
}
