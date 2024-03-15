import { gql } from "@/src/generated";

export const CALENDARS_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription Calendar {
    Calendar_Hoy_Tecnico {
      calendar {
        cantidad
        dayMes
      }
      mantenimientos {
        _id
        anotaciones
        cambiosSolicitados
        cliente
        diagnostico
        diagnosticoFinal
        documentos
        estado
        fecha
        fechaFin
        fechaInicio
        fechaSoat
        kmMedido
        kmPrevio
        placa
        repuestos {
          cantidad
          cantidadReserva
          id
          marca
          precio
          producto
        }
        repuestosAjuste {
          cantidad
          id
          marca
          precio
          producto
          cantidadReserva
        }
        tecnico
        tipo
      }
    }
  }
`);

export const GET_CALENDARS = gql(/* GraphQL */ `
  query Calendar_Hoy_get {
    Query_Calendar_Hoy_Tecnico {
      calendar {
        cantidad
        dayMes
      }
      mantenimientos {
        _id
        anotaciones
        cambiosSolicitados
        cliente
        diagnostico
        diagnosticoFinal
        documentos
        estado
        fecha
        fechaFin
        fechaInicio
        fechaSoat
        kmMedido
        kmPrevio
        placa
        repuestos {
          cantidad
          id
          marca
          cantidadReserva
          precio
          producto
        }
        repuestosAjuste {
          cantidad
          cantidadReserva
          id
          marca
          precio
          producto
        }
        tecnico
        tipo
      }
    }
  }
`);
