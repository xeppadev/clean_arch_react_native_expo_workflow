import { gql } from "@apollo/client";

export const OBTENER_INFO_BARCHART = gql`
  query Query_BarChart($inputDate: String!) {
    grafica_gastos_generales(inputDate: $inputDate) {
      fact
      mesYear
      otros
      personalTotal
    }
  }
`;
