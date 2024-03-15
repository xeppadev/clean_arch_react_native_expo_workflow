import { gql } from "@/src/generated";

export const GET_TASKS = gql(/* GraphQL */ `
  subscription Actividades {
    Actividades {
      _id
      estado
      fecha
      placa
    }
  }
`);