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
      cambiosSolicitados
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

export const REGISTRAR_NO_MANTENIMIENTO = gql(/* GraphQL */ `
  mutation Regisrar_mantenimiento_no_programado(
    $updateOneMantenimientoInput: UpdateOneMantenimientoDto!
  ) {
    regisrar_mantenimiento_no_programado(
      updateOneMantenimientoInput: $updateOneMantenimientoInput
    )
  }
`);

export const HOME_MANTENIMIENTOS = gql(/* GraphQL */ `
  query Home_admin($fecha: DateTime!) {
    home_admin(fecha: $fecha) {
      mantenimientos {
        _id
        placa
        tipo
        estado
      }
      cantidadTotal
      cantidadCompletada
      cantidadRevision
    }
  }
`);

export const CAMBIAR_ESTADO_MANTENIMIENTO = gql(/* GraphQL */ `
  mutation Cambiar_estado_revision_o_denegado(
    $denegado: Boolean!
    $revision: Boolean!
    $cambiarEstadoRevisionODenegadoId: String!
    $repuestosAjuste: [CreateRepuestoAjusteDto!]!
    $cambiosSolicitados: String
  ) {
    cambiar_estado_revision_o_denegado(
      denegado: $denegado
      revision: $revision
      id: $cambiarEstadoRevisionODenegadoId
      repuestosAjuste: $repuestosAjuste
      cambiosSolicitados: $cambiosSolicitados
    )
  }
`);

export const COMPLETAR_MANTENIMIENTO = gql(/* GraphQL */ `
  mutation Completar_mantenimiento(
    $completarMantenimientoId: String!
    $diagnosticoFinal: String!
    $fechaFin: DateTime!
  ) {
    completar_mantenimiento(
      id: $completarMantenimientoId
      diagnosticoFinal: $diagnosticoFinal
      fechaFin: $fechaFin
    )
  }
`);
