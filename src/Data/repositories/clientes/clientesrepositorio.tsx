import { gql } from "@/src/generated";

export const OBTENER_INFO_CLIENTES = gql(/* GraphQL */ `
  query Obtener_Todos_Clientes {
    obtener_Todos_Clientes {
      nombre
      nombreCliente
      _id
      contratos {
        fechaFin
      }
    }
  }
`);

export const OBTENER_CLIENTE_ID = gql(/* GraphQL */ `
  query Obtener_Cliente_ID($obtenerClienteIdId: String!) {
    obtener_Cliente_ID(id: $obtenerClienteIdId) {
      _id
      contratos {
        fechaFin
        fechaInicio
        numeroContrato
      }
      direccion
      documentos
      email
      nombre
      nombreCliente
      numeroContacto
      rubro
      ruc
    }
  }
`);


export const OBTENER_SOLO_CLIENTES = gql (/* GraphQL */ `
  query Obtener_Solo_Clientes {
    obtener_Todos_Clientes {
      nombreCliente
    }
  }
`
);
