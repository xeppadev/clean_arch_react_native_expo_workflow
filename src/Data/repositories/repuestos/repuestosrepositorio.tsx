import { gql } from "@/src/generated";

export const OBTENER_TODO_REPUESTOS = gql( /* GraphQL */ `
  query ExampleQuery {
    obtener_todos_los_repuestos {
      cantidad
      cantidadReserva
      id
      marca
      precio
      producto
    }
  }
`
);
