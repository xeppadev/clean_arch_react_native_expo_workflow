import { gql } from "@/src/generated";

export const EMERGENCIA_MUTATION = gql(/* GraphQL */ `
  mutation Mutation($emergencia: String!) {
    emergencia_notificacion(emergencia: $emergencia)
  }
`);
