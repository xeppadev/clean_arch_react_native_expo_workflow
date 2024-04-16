import { gql } from "@apollo/client";

export const REGISTRAR_FACTURA = gql(/* GraphQL */ `
  mutation Mutation_registrarFactura($createFacturaInput: CreateFacturaDto!) {
    crear_factura(createFacturaInput: $createFacturaInput)
  }
`);

