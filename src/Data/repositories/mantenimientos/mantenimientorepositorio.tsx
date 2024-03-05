import { gql } from "@/src/generated";

export const PROGRAMAR_MANTENIMIENTO = gql(/* GraphQL */ `
  mutation ProgramarMantenimiento(
    $programarMantInput: PrograMantenimientoDto!
  ) {
    programar_mantenimiento(programarMantInput: $programarMantInput)
  }
`);

export const MANTEN_INFO_ID = gql(/* GraphQL */ `
  query mantenimientoInfoPorId($mantenimientoInfoPorIdId: String!) {
    Mantenimiento_Info_por_ID(id: $mantenimientoInfoPorIdId) {
      anotaciones
      cliente
      diagnostico
      documentos
      diagnosticoFinal
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
`);

export const MANTENIMIENTOS_POR_PLACA = gql(/* GraphQL */ `
  query Mantenimiento_Info_por_Placa($placa: String!) {
    Mantenimiento_Info_por_Placa(placa: $placa) {
      _id
      tipo
      fecha
      estado
      tecnico
      kmPrevio
      fechaSoat
      anotaciones
    }
  }
`);

export const REGISTRAR_MANTENIMIENTO = gql(/* GraphQL */ `
  mutation Regisrar_mantenimiento_programado(
    $registrarMantInput: UpdateMantenimientoDto!
  ) {
    regisrar_mantenimiento_programado(registrarMantInput: $registrarMantInput)
  }
`);
