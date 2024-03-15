import { gql } from "@/src/generated";
export const OBTENER_INFO_BARCHART = gql(/* GraphQL */ `
  query Query_BarChart($inputDate: String!) {
    grafica_gastos_generales(inputDate: $inputDate) {
      fact
      mesYear
      otros
      personalTotal
    }
  }
`);

export const OBTENER_INFO_LINECHART = gql(/* GraphQL */`
query Query_LineChart($inputDate: String!) {
  grafica_ingresos_egresos(inputDate: $inputDate) {
    mesYear
    ingresoFact
    egresosTotalFact
  }
}
`);


export const OBTENER_INFO_PIECHART = gql(/* GraphQL */`
query Query_PieChart($startDate: String!, $months: Float!) {
  grafica_repuesto_xmeses(startDate: $startDate, months: $months) {
    prod1 {
      cantidadConsumida
      producto
    }
    prod2 {
      cantidadConsumida
      producto
    }
    prod3 {
      cantidadConsumida
      producto
    }
    prod4 {
      cantidadConsumida
      producto
    }
    prod5 {
      cantidadConsumida
      producto
    }
    otros {
      cantidadConsumida
      producto
    }
    mesYear
  }
}
`);



