import { gql } from "@/src/generated";

export const OBTENER_TODO_PERSONAL = gql(/* GraphQL */ `
  query PersonalQuery {
    obtener_Todo_Personal {
      _id
      nombre
      numero
      salarioFecha {
        fecha
        salario
      }
    }
  }
`);

export const OBTENER_PERSONAL_ID = gql(/* GraphQL */ `
  query PersonalIDQuery($obtenerPersonalPorIdId: String!) {
    obtener_Personal_Por_Id(id: $obtenerPersonalPorIdId) {
      _id
      documentos
      email
      fechaIngreso
      nombre
      numero
      salarioFecha {
        fecha
        salario
      }
    }
  }
`);
