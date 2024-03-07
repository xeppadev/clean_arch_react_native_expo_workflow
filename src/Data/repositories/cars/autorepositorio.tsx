// src/data/repositories/PlacaRepository.ts
import { gql } from "@apollo/client";

export const OBTENER_INFO_PLACAS = gql(/* GraphQL */ `
  query obtenerInfoPlacas {
    obtener_info_placas {
      _id
      cliente
      fechaSoat
      placa
    }
  }
`);

export const ADMIN_HISTORY_CARS = gql(/* GraphQL */ `
  query adminHistoryCars($placa: String!) {
    admin_history_cars(placa: $placa) {
      Mantenimientos {
        fecha
        id
        repuestosUsados
        tipo
      }
      Puntaje
      cliente
      fechaSoat
      id
      kmActual
      placa
      propietario
      vigenciaContrato
    }
  }
`);

export const OBTENER_PLACAS = gql(/* GraphQL */ `
  query obtenerPlacas {
    obtener_info_placas {
      placa
    }
  }
`);

export const OBTENER_PROPIETARIOS = gql(/* GraphQL */ `
  query Query_getPropietarios {
    obtener_info_placas {
      propietario
    }
  }
`);

export const REGISTRAR_AUTO = gql(/* GraphQL */ `
  mutation Crear_auto($createCarInput: CreateCarDto!) {
    crear_auto(createCarInput: $createCarInput)
  }
`);



export const INFO_SOME_PLACA = gql `
query Obtener_info_for_placa($placa: String!) {
  obtener_info_for_placa(placa: $placa) {
    _id
    fechaSoat
    kmActual
    cliente
  }
}
`

