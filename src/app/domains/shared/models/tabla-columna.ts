export interface Accion<T=any> {
  accion: string;//editar - eliminar
  fila?: T; //registro
}
