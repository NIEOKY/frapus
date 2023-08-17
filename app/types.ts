export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
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
  pedidos: [
    {
      id: number;
      cuenta: Cuenta;
      total: number;
    }
  ];
}

export interface Pedido {
  id: number;
  cuenta: Cuenta;
  total: number;
}
