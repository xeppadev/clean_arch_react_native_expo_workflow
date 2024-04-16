/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query obtenerInfoPlacas {\n    obtener_info_placas {\n      _id\n      cliente\n      fechaSoat\n      placa\n    }\n  }\n": types.ObtenerInfoPlacasDocument,
    "\n  query adminHistoryCars($placa: String!) {\n    admin_history_cars(placa: $placa) {\n      Mantenimientos {\n        fecha\n        id\n        repuestosUsados\n        tipo\n      }\n      Puntaje\n      cliente\n      fechaSoat\n      id\n      kmActual\n      placa\n      propietario\n      vigenciaContrato\n    }\n  }\n": types.AdminHistoryCarsDocument,
    "\n  query obtenerPlacas {\n    obtener_info_placas {\n      placa\n    }\n  }\n": types.ObtenerPlacasDocument,
    "\n  query Query_getPropietarios {\n    obtener_info_placas {\n      propietario\n    }\n  }\n": types.Query_GetPropietariosDocument,
    "\n  mutation Crear_auto($createCarInput: CreateCarDto!) {\n    crear_auto(createCarInput: $createCarInput)\n  }\n": types.Crear_AutoDocument,
    "\n  query Obtener_info_for_placa($placa: String!) {\n    obtener_info_for_placa(placa: $placa) {\n      _id\n      fechaSoat\n      kmActual\n      cliente\n    }\n  }\n": types.Obtener_Info_For_PlacaDocument,
    "\n  query Obtener_info_placas_clientes {\n    obtener_info_placas_clientes {\n      _id\n      cliente\n      placa\n      fechaSoat\n    }\n  }\n": types.Obtener_Info_Placas_ClientesDocument,
    "\n  query Obtener_Todos_Clientes {\n    obtener_Todos_Clientes {\n      nombre\n      nombreCliente\n      _id\n      contratos {\n        fechaFin\n      }\n    }\n  }\n": types.Obtener_Todos_ClientesDocument,
    "\n  query Obtener_Cliente_ID($obtenerClienteIdId: String!) {\n    obtener_Cliente_ID(id: $obtenerClienteIdId) {\n      _id\n      contratos {\n        fechaFin\n        fechaInicio\n        numeroContrato\n      }\n      direccion\n      documentos\n      email\n      nombre\n      nombreCliente\n      numeroContacto\n      rubro\n      ruc\n    }\n  }\n": types.Obtener_Cliente_IdDocument,
    "\n  query Obtener_Solo_Clientes {\n    obtener_Todos_Clientes {\n      nombreCliente\n    }\n  }\n": types.Obtener_Solo_ClientesDocument,
    "\n  mutation Mutation($emergencia: String!) {\n    emergencia_notificacion(emergencia: $emergencia)\n  }\n": types.MutationDocument,
    "\n  query Query_BarChart($inputDate: String!) {\n    grafica_gastos_generales(inputDate: $inputDate) {\n      fact\n      mesYear\n      otros\n      personalTotal\n    }\n  }\n": types.Query_BarChartDocument,
    "\n  query Query_LineChart($inputDate: String!) {\n    grafica_ingresos_egresos(inputDate: $inputDate) {\n      mesYear\n      ingresoFact\n      egresosTotalFact\n    }\n  }\n": types.Query_LineChartDocument,
    "\n  query Query_PieChart($startDate: String!, $months: Float!) {\n    grafica_repuesto_xmeses(startDate: $startDate, months: $months) {\n      prod1 {\n        cantidadConsumida\n        producto\n      }\n      prod2 {\n        cantidadConsumida\n        producto\n      }\n      prod3 {\n        cantidadConsumida\n        producto\n      }\n      prod4 {\n        cantidadConsumida\n        producto\n      }\n      prod5 {\n        cantidadConsumida\n        producto\n      }\n      otros {\n        cantidadConsumida\n        producto\n      }\n      mesYear\n    }\n  }\n": types.Query_PieChartDocument,
    "\n  query Calendar_grafica {\n    calendar_grafica {\n      cantidad\n      fecha\n    }\n  }\n": types.Calendar_GraficaDocument,
    "\n  mutation Mutation_registrarFactura($createFacturaInput: CreateFacturaDto!) {\n    crear_factura(createFacturaInput: $createFacturaInput)\n  }\n": types.Mutation_RegistrarFacturaDocument,
    "\n  mutation ProgramarMantenimiento(\n    $programarMantInput: PrograMantenimientoDto!\n  ) {\n    programar_mantenimiento(programarMantInput: $programarMantInput)\n  }\n": types.ProgramarMantenimientoDocument,
    "\n  query mantenimientoInfoPorId($mantenimientoInfoPorIdId: String!) {\n    Mantenimiento_Info_por_ID(id: $mantenimientoInfoPorIdId) {\n      anotaciones\n      cambiosSolicitados\n      cliente\n      diagnostico\n      documentos\n      diagnosticoFinal\n      estado\n      fecha\n      fechaFin\n      fechaInicio\n      fechaSoat\n      kmMedido\n      kmPrevio\n      placa\n      repuestos {\n        cantidad\n        cantidadReserva\n        id\n        marca\n        precio\n        producto\n      }\n      repuestosAjuste {\n        cantidad\n        cantidadReserva\n        id\n        marca\n        precio\n        producto\n      }\n      tecnico\n      tipo\n    }\n  }\n": types.MantenimientoInfoPorIdDocument,
    "\n  query Mantenimiento_Info_por_Placa($placa: String!) {\n    Mantenimiento_Info_por_Placa(placa: $placa) {\n      _id\n      tipo\n      fecha\n      estado\n      tecnico\n      kmPrevio\n      fechaSoat\n      anotaciones\n    }\n  }\n": types.Mantenimiento_Info_Por_PlacaDocument,
    "\n  mutation Regisrar_mantenimiento_programado(\n    $registrarMantInput: UpdateMantenimientoDto!\n  ) {\n    regisrar_mantenimiento_programado(registrarMantInput: $registrarMantInput)\n  }\n": types.Regisrar_Mantenimiento_ProgramadoDocument,
    "\n  mutation Regisrar_mantenimiento_no_programado(\n    $updateOneMantenimientoInput: UpdateOneMantenimientoDto!\n  ) {\n    regisrar_mantenimiento_no_programado(\n      updateOneMantenimientoInput: $updateOneMantenimientoInput\n    )\n  }\n": types.Regisrar_Mantenimiento_No_ProgramadoDocument,
    "\n  query Home_admin($fecha: DateTime!) {\n    home_admin(fecha: $fecha) {\n      mantenimientos {\n        _id\n        placa\n        tipo\n        estado\n      }\n      cantidadTotal\n      cantidadCompletada\n      cantidadRevision\n    }\n  }\n": types.Home_AdminDocument,
    "\n  mutation Cambiar_estado_revision_o_denegado(\n    $denegado: Boolean!\n    $revision: Boolean!\n    $cambiarEstadoRevisionODenegadoId: String!\n    $repuestosAjuste: [CreateRepuestoAjusteDto!]!\n    $cambiosSolicitados: String\n  ) {\n    cambiar_estado_revision_o_denegado(\n      denegado: $denegado\n      revision: $revision\n      id: $cambiarEstadoRevisionODenegadoId\n      repuestosAjuste: $repuestosAjuste\n      cambiosSolicitados: $cambiosSolicitados\n    )\n  }\n": types.Cambiar_Estado_Revision_O_DenegadoDocument,
    "\n  mutation Completar_mantenimiento(\n    $completarMantenimientoId: String!\n    $diagnosticoFinal: String!\n    $fechaFin: DateTime!\n  ) {\n    completar_mantenimiento(\n      id: $completarMantenimientoId\n      diagnosticoFinal: $diagnosticoFinal\n      fechaFin: $fechaFin\n    )\n  }\n": types.Completar_MantenimientoDocument,
    "\n  query Obtener_usuario_por_username($username: String!) {\n    obtener_usuario_por_username(username: $username) {\n      email\n      name\n      nivelUser\n      username\n      _id\n    }\n  }\n": types.Obtener_Usuario_Por_UsernameDocument,
    "\n  mutation Actualizar_datos_usuario(\n    $oldUsername: String!\n    $newUsername: String!\n    $newName: String!\n    $newEmail: String!\n    $newPassword: String!\n  ) {\n    actualizar_datos_usuario(\n      oldUsername: $oldUsername\n      newUsername: $newUsername\n      newName: $newName\n      newEmail: $newEmail\n      newPassword: $newPassword\n    )\n  }\n": types.Actualizar_Datos_UsuarioDocument,
    "\n  query PersonalQuery {\n    obtener_Todo_Personal {\n      _id\n      nombre\n      numero\n      salarioFecha {\n        fecha\n        salario\n      }\n    }\n  }\n": types.PersonalQueryDocument,
    "\n  query PersonalIDQuery($obtenerPersonalPorIdId: String!) {\n    obtener_Personal_Por_Id(id: $obtenerPersonalPorIdId) {\n      _id\n      documentos\n      email\n      fechaIngreso\n      nombre\n      numero\n      salarioFecha {\n        fecha\n        salario\n      }\n    }\n  }\n": types.PersonalIdQueryDocument,
    "\n  query ExampleQuery {\n    obtener_todos_los_repuestos {\n      cantidad\n      cantidadReserva\n      id\n      marca\n      precio\n      producto\n    }\n  }\n": types.ExampleQueryDocument,
    "\n  subscription Calendar {\n    Calendar_Hoy_Tecnico {\n      calendar {\n        cantidad\n        dayMes\n      }\n      mantenimientos {\n        _id\n        anotaciones\n        cambiosSolicitados\n        cliente\n        diagnostico\n        diagnosticoFinal\n        documentos\n        estado\n        fecha\n        fechaFin\n        fechaInicio\n        fechaSoat\n        kmMedido\n        kmPrevio\n        placa\n        repuestos {\n          cantidad\n          cantidadReserva\n          id\n          marca\n          precio\n          producto\n        }\n        repuestosAjuste {\n          cantidad\n          id\n          marca\n          precio\n          producto\n          cantidadReserva\n        }\n        tecnico\n        tipo\n      }\n    }\n  }\n": types.CalendarDocument,
    "\n  query Calendar_Hoy_get {\n    Query_Calendar_Hoy_Tecnico {\n      calendar {\n        cantidad\n        dayMes\n      }\n      mantenimientos {\n        _id\n        anotaciones\n        cambiosSolicitados\n        cliente\n        diagnostico\n        diagnosticoFinal\n        documentos\n        estado\n        fecha\n        fechaFin\n        fechaInicio\n        fechaSoat\n        kmMedido\n        kmPrevio\n        placa\n        repuestos {\n          cantidad\n          id\n          marca\n          cantidadReserva\n          precio\n          producto\n        }\n        repuestosAjuste {\n          cantidad\n          cantidadReserva\n          id\n          marca\n          precio\n          producto\n        }\n        tecnico\n        tipo\n      }\n    }\n  }\n": types.Calendar_Hoy_GetDocument,
    "\n  subscription Actividades {\n    Actividades {\n      _id\n      estado\n      fecha\n      placa\n    }\n  }\n": types.ActividadesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query obtenerInfoPlacas {\n    obtener_info_placas {\n      _id\n      cliente\n      fechaSoat\n      placa\n    }\n  }\n"): (typeof documents)["\n  query obtenerInfoPlacas {\n    obtener_info_placas {\n      _id\n      cliente\n      fechaSoat\n      placa\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query adminHistoryCars($placa: String!) {\n    admin_history_cars(placa: $placa) {\n      Mantenimientos {\n        fecha\n        id\n        repuestosUsados\n        tipo\n      }\n      Puntaje\n      cliente\n      fechaSoat\n      id\n      kmActual\n      placa\n      propietario\n      vigenciaContrato\n    }\n  }\n"): (typeof documents)["\n  query adminHistoryCars($placa: String!) {\n    admin_history_cars(placa: $placa) {\n      Mantenimientos {\n        fecha\n        id\n        repuestosUsados\n        tipo\n      }\n      Puntaje\n      cliente\n      fechaSoat\n      id\n      kmActual\n      placa\n      propietario\n      vigenciaContrato\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query obtenerPlacas {\n    obtener_info_placas {\n      placa\n    }\n  }\n"): (typeof documents)["\n  query obtenerPlacas {\n    obtener_info_placas {\n      placa\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Query_getPropietarios {\n    obtener_info_placas {\n      propietario\n    }\n  }\n"): (typeof documents)["\n  query Query_getPropietarios {\n    obtener_info_placas {\n      propietario\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Crear_auto($createCarInput: CreateCarDto!) {\n    crear_auto(createCarInput: $createCarInput)\n  }\n"): (typeof documents)["\n  mutation Crear_auto($createCarInput: CreateCarDto!) {\n    crear_auto(createCarInput: $createCarInput)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Obtener_info_for_placa($placa: String!) {\n    obtener_info_for_placa(placa: $placa) {\n      _id\n      fechaSoat\n      kmActual\n      cliente\n    }\n  }\n"): (typeof documents)["\n  query Obtener_info_for_placa($placa: String!) {\n    obtener_info_for_placa(placa: $placa) {\n      _id\n      fechaSoat\n      kmActual\n      cliente\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Obtener_info_placas_clientes {\n    obtener_info_placas_clientes {\n      _id\n      cliente\n      placa\n      fechaSoat\n    }\n  }\n"): (typeof documents)["\n  query Obtener_info_placas_clientes {\n    obtener_info_placas_clientes {\n      _id\n      cliente\n      placa\n      fechaSoat\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Obtener_Todos_Clientes {\n    obtener_Todos_Clientes {\n      nombre\n      nombreCliente\n      _id\n      contratos {\n        fechaFin\n      }\n    }\n  }\n"): (typeof documents)["\n  query Obtener_Todos_Clientes {\n    obtener_Todos_Clientes {\n      nombre\n      nombreCliente\n      _id\n      contratos {\n        fechaFin\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Obtener_Cliente_ID($obtenerClienteIdId: String!) {\n    obtener_Cliente_ID(id: $obtenerClienteIdId) {\n      _id\n      contratos {\n        fechaFin\n        fechaInicio\n        numeroContrato\n      }\n      direccion\n      documentos\n      email\n      nombre\n      nombreCliente\n      numeroContacto\n      rubro\n      ruc\n    }\n  }\n"): (typeof documents)["\n  query Obtener_Cliente_ID($obtenerClienteIdId: String!) {\n    obtener_Cliente_ID(id: $obtenerClienteIdId) {\n      _id\n      contratos {\n        fechaFin\n        fechaInicio\n        numeroContrato\n      }\n      direccion\n      documentos\n      email\n      nombre\n      nombreCliente\n      numeroContacto\n      rubro\n      ruc\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Obtener_Solo_Clientes {\n    obtener_Todos_Clientes {\n      nombreCliente\n    }\n  }\n"): (typeof documents)["\n  query Obtener_Solo_Clientes {\n    obtener_Todos_Clientes {\n      nombreCliente\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Mutation($emergencia: String!) {\n    emergencia_notificacion(emergencia: $emergencia)\n  }\n"): (typeof documents)["\n  mutation Mutation($emergencia: String!) {\n    emergencia_notificacion(emergencia: $emergencia)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Query_BarChart($inputDate: String!) {\n    grafica_gastos_generales(inputDate: $inputDate) {\n      fact\n      mesYear\n      otros\n      personalTotal\n    }\n  }\n"): (typeof documents)["\n  query Query_BarChart($inputDate: String!) {\n    grafica_gastos_generales(inputDate: $inputDate) {\n      fact\n      mesYear\n      otros\n      personalTotal\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Query_LineChart($inputDate: String!) {\n    grafica_ingresos_egresos(inputDate: $inputDate) {\n      mesYear\n      ingresoFact\n      egresosTotalFact\n    }\n  }\n"): (typeof documents)["\n  query Query_LineChart($inputDate: String!) {\n    grafica_ingresos_egresos(inputDate: $inputDate) {\n      mesYear\n      ingresoFact\n      egresosTotalFact\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Query_PieChart($startDate: String!, $months: Float!) {\n    grafica_repuesto_xmeses(startDate: $startDate, months: $months) {\n      prod1 {\n        cantidadConsumida\n        producto\n      }\n      prod2 {\n        cantidadConsumida\n        producto\n      }\n      prod3 {\n        cantidadConsumida\n        producto\n      }\n      prod4 {\n        cantidadConsumida\n        producto\n      }\n      prod5 {\n        cantidadConsumida\n        producto\n      }\n      otros {\n        cantidadConsumida\n        producto\n      }\n      mesYear\n    }\n  }\n"): (typeof documents)["\n  query Query_PieChart($startDate: String!, $months: Float!) {\n    grafica_repuesto_xmeses(startDate: $startDate, months: $months) {\n      prod1 {\n        cantidadConsumida\n        producto\n      }\n      prod2 {\n        cantidadConsumida\n        producto\n      }\n      prod3 {\n        cantidadConsumida\n        producto\n      }\n      prod4 {\n        cantidadConsumida\n        producto\n      }\n      prod5 {\n        cantidadConsumida\n        producto\n      }\n      otros {\n        cantidadConsumida\n        producto\n      }\n      mesYear\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Calendar_grafica {\n    calendar_grafica {\n      cantidad\n      fecha\n    }\n  }\n"): (typeof documents)["\n  query Calendar_grafica {\n    calendar_grafica {\n      cantidad\n      fecha\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Mutation_registrarFactura($createFacturaInput: CreateFacturaDto!) {\n    crear_factura(createFacturaInput: $createFacturaInput)\n  }\n"): (typeof documents)["\n  mutation Mutation_registrarFactura($createFacturaInput: CreateFacturaDto!) {\n    crear_factura(createFacturaInput: $createFacturaInput)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ProgramarMantenimiento(\n    $programarMantInput: PrograMantenimientoDto!\n  ) {\n    programar_mantenimiento(programarMantInput: $programarMantInput)\n  }\n"): (typeof documents)["\n  mutation ProgramarMantenimiento(\n    $programarMantInput: PrograMantenimientoDto!\n  ) {\n    programar_mantenimiento(programarMantInput: $programarMantInput)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query mantenimientoInfoPorId($mantenimientoInfoPorIdId: String!) {\n    Mantenimiento_Info_por_ID(id: $mantenimientoInfoPorIdId) {\n      anotaciones\n      cambiosSolicitados\n      cliente\n      diagnostico\n      documentos\n      diagnosticoFinal\n      estado\n      fecha\n      fechaFin\n      fechaInicio\n      fechaSoat\n      kmMedido\n      kmPrevio\n      placa\n      repuestos {\n        cantidad\n        cantidadReserva\n        id\n        marca\n        precio\n        producto\n      }\n      repuestosAjuste {\n        cantidad\n        cantidadReserva\n        id\n        marca\n        precio\n        producto\n      }\n      tecnico\n      tipo\n    }\n  }\n"): (typeof documents)["\n  query mantenimientoInfoPorId($mantenimientoInfoPorIdId: String!) {\n    Mantenimiento_Info_por_ID(id: $mantenimientoInfoPorIdId) {\n      anotaciones\n      cambiosSolicitados\n      cliente\n      diagnostico\n      documentos\n      diagnosticoFinal\n      estado\n      fecha\n      fechaFin\n      fechaInicio\n      fechaSoat\n      kmMedido\n      kmPrevio\n      placa\n      repuestos {\n        cantidad\n        cantidadReserva\n        id\n        marca\n        precio\n        producto\n      }\n      repuestosAjuste {\n        cantidad\n        cantidadReserva\n        id\n        marca\n        precio\n        producto\n      }\n      tecnico\n      tipo\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Mantenimiento_Info_por_Placa($placa: String!) {\n    Mantenimiento_Info_por_Placa(placa: $placa) {\n      _id\n      tipo\n      fecha\n      estado\n      tecnico\n      kmPrevio\n      fechaSoat\n      anotaciones\n    }\n  }\n"): (typeof documents)["\n  query Mantenimiento_Info_por_Placa($placa: String!) {\n    Mantenimiento_Info_por_Placa(placa: $placa) {\n      _id\n      tipo\n      fecha\n      estado\n      tecnico\n      kmPrevio\n      fechaSoat\n      anotaciones\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Regisrar_mantenimiento_programado(\n    $registrarMantInput: UpdateMantenimientoDto!\n  ) {\n    regisrar_mantenimiento_programado(registrarMantInput: $registrarMantInput)\n  }\n"): (typeof documents)["\n  mutation Regisrar_mantenimiento_programado(\n    $registrarMantInput: UpdateMantenimientoDto!\n  ) {\n    regisrar_mantenimiento_programado(registrarMantInput: $registrarMantInput)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Regisrar_mantenimiento_no_programado(\n    $updateOneMantenimientoInput: UpdateOneMantenimientoDto!\n  ) {\n    regisrar_mantenimiento_no_programado(\n      updateOneMantenimientoInput: $updateOneMantenimientoInput\n    )\n  }\n"): (typeof documents)["\n  mutation Regisrar_mantenimiento_no_programado(\n    $updateOneMantenimientoInput: UpdateOneMantenimientoDto!\n  ) {\n    regisrar_mantenimiento_no_programado(\n      updateOneMantenimientoInput: $updateOneMantenimientoInput\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Home_admin($fecha: DateTime!) {\n    home_admin(fecha: $fecha) {\n      mantenimientos {\n        _id\n        placa\n        tipo\n        estado\n      }\n      cantidadTotal\n      cantidadCompletada\n      cantidadRevision\n    }\n  }\n"): (typeof documents)["\n  query Home_admin($fecha: DateTime!) {\n    home_admin(fecha: $fecha) {\n      mantenimientos {\n        _id\n        placa\n        tipo\n        estado\n      }\n      cantidadTotal\n      cantidadCompletada\n      cantidadRevision\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Cambiar_estado_revision_o_denegado(\n    $denegado: Boolean!\n    $revision: Boolean!\n    $cambiarEstadoRevisionODenegadoId: String!\n    $repuestosAjuste: [CreateRepuestoAjusteDto!]!\n    $cambiosSolicitados: String\n  ) {\n    cambiar_estado_revision_o_denegado(\n      denegado: $denegado\n      revision: $revision\n      id: $cambiarEstadoRevisionODenegadoId\n      repuestosAjuste: $repuestosAjuste\n      cambiosSolicitados: $cambiosSolicitados\n    )\n  }\n"): (typeof documents)["\n  mutation Cambiar_estado_revision_o_denegado(\n    $denegado: Boolean!\n    $revision: Boolean!\n    $cambiarEstadoRevisionODenegadoId: String!\n    $repuestosAjuste: [CreateRepuestoAjusteDto!]!\n    $cambiosSolicitados: String\n  ) {\n    cambiar_estado_revision_o_denegado(\n      denegado: $denegado\n      revision: $revision\n      id: $cambiarEstadoRevisionODenegadoId\n      repuestosAjuste: $repuestosAjuste\n      cambiosSolicitados: $cambiosSolicitados\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Completar_mantenimiento(\n    $completarMantenimientoId: String!\n    $diagnosticoFinal: String!\n    $fechaFin: DateTime!\n  ) {\n    completar_mantenimiento(\n      id: $completarMantenimientoId\n      diagnosticoFinal: $diagnosticoFinal\n      fechaFin: $fechaFin\n    )\n  }\n"): (typeof documents)["\n  mutation Completar_mantenimiento(\n    $completarMantenimientoId: String!\n    $diagnosticoFinal: String!\n    $fechaFin: DateTime!\n  ) {\n    completar_mantenimiento(\n      id: $completarMantenimientoId\n      diagnosticoFinal: $diagnosticoFinal\n      fechaFin: $fechaFin\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Obtener_usuario_por_username($username: String!) {\n    obtener_usuario_por_username(username: $username) {\n      email\n      name\n      nivelUser\n      username\n      _id\n    }\n  }\n"): (typeof documents)["\n  query Obtener_usuario_por_username($username: String!) {\n    obtener_usuario_por_username(username: $username) {\n      email\n      name\n      nivelUser\n      username\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Actualizar_datos_usuario(\n    $oldUsername: String!\n    $newUsername: String!\n    $newName: String!\n    $newEmail: String!\n    $newPassword: String!\n  ) {\n    actualizar_datos_usuario(\n      oldUsername: $oldUsername\n      newUsername: $newUsername\n      newName: $newName\n      newEmail: $newEmail\n      newPassword: $newPassword\n    )\n  }\n"): (typeof documents)["\n  mutation Actualizar_datos_usuario(\n    $oldUsername: String!\n    $newUsername: String!\n    $newName: String!\n    $newEmail: String!\n    $newPassword: String!\n  ) {\n    actualizar_datos_usuario(\n      oldUsername: $oldUsername\n      newUsername: $newUsername\n      newName: $newName\n      newEmail: $newEmail\n      newPassword: $newPassword\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PersonalQuery {\n    obtener_Todo_Personal {\n      _id\n      nombre\n      numero\n      salarioFecha {\n        fecha\n        salario\n      }\n    }\n  }\n"): (typeof documents)["\n  query PersonalQuery {\n    obtener_Todo_Personal {\n      _id\n      nombre\n      numero\n      salarioFecha {\n        fecha\n        salario\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PersonalIDQuery($obtenerPersonalPorIdId: String!) {\n    obtener_Personal_Por_Id(id: $obtenerPersonalPorIdId) {\n      _id\n      documentos\n      email\n      fechaIngreso\n      nombre\n      numero\n      salarioFecha {\n        fecha\n        salario\n      }\n    }\n  }\n"): (typeof documents)["\n  query PersonalIDQuery($obtenerPersonalPorIdId: String!) {\n    obtener_Personal_Por_Id(id: $obtenerPersonalPorIdId) {\n      _id\n      documentos\n      email\n      fechaIngreso\n      nombre\n      numero\n      salarioFecha {\n        fecha\n        salario\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ExampleQuery {\n    obtener_todos_los_repuestos {\n      cantidad\n      cantidadReserva\n      id\n      marca\n      precio\n      producto\n    }\n  }\n"): (typeof documents)["\n  query ExampleQuery {\n    obtener_todos_los_repuestos {\n      cantidad\n      cantidadReserva\n      id\n      marca\n      precio\n      producto\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription Calendar {\n    Calendar_Hoy_Tecnico {\n      calendar {\n        cantidad\n        dayMes\n      }\n      mantenimientos {\n        _id\n        anotaciones\n        cambiosSolicitados\n        cliente\n        diagnostico\n        diagnosticoFinal\n        documentos\n        estado\n        fecha\n        fechaFin\n        fechaInicio\n        fechaSoat\n        kmMedido\n        kmPrevio\n        placa\n        repuestos {\n          cantidad\n          cantidadReserva\n          id\n          marca\n          precio\n          producto\n        }\n        repuestosAjuste {\n          cantidad\n          id\n          marca\n          precio\n          producto\n          cantidadReserva\n        }\n        tecnico\n        tipo\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription Calendar {\n    Calendar_Hoy_Tecnico {\n      calendar {\n        cantidad\n        dayMes\n      }\n      mantenimientos {\n        _id\n        anotaciones\n        cambiosSolicitados\n        cliente\n        diagnostico\n        diagnosticoFinal\n        documentos\n        estado\n        fecha\n        fechaFin\n        fechaInicio\n        fechaSoat\n        kmMedido\n        kmPrevio\n        placa\n        repuestos {\n          cantidad\n          cantidadReserva\n          id\n          marca\n          precio\n          producto\n        }\n        repuestosAjuste {\n          cantidad\n          id\n          marca\n          precio\n          producto\n          cantidadReserva\n        }\n        tecnico\n        tipo\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Calendar_Hoy_get {\n    Query_Calendar_Hoy_Tecnico {\n      calendar {\n        cantidad\n        dayMes\n      }\n      mantenimientos {\n        _id\n        anotaciones\n        cambiosSolicitados\n        cliente\n        diagnostico\n        diagnosticoFinal\n        documentos\n        estado\n        fecha\n        fechaFin\n        fechaInicio\n        fechaSoat\n        kmMedido\n        kmPrevio\n        placa\n        repuestos {\n          cantidad\n          id\n          marca\n          cantidadReserva\n          precio\n          producto\n        }\n        repuestosAjuste {\n          cantidad\n          cantidadReserva\n          id\n          marca\n          precio\n          producto\n        }\n        tecnico\n        tipo\n      }\n    }\n  }\n"): (typeof documents)["\n  query Calendar_Hoy_get {\n    Query_Calendar_Hoy_Tecnico {\n      calendar {\n        cantidad\n        dayMes\n      }\n      mantenimientos {\n        _id\n        anotaciones\n        cambiosSolicitados\n        cliente\n        diagnostico\n        diagnosticoFinal\n        documentos\n        estado\n        fecha\n        fechaFin\n        fechaInicio\n        fechaSoat\n        kmMedido\n        kmPrevio\n        placa\n        repuestos {\n          cantidad\n          id\n          marca\n          cantidadReserva\n          precio\n          producto\n        }\n        repuestosAjuste {\n          cantidad\n          cantidadReserva\n          id\n          marca\n          precio\n          producto\n        }\n        tecnico\n        tipo\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription Actividades {\n    Actividades {\n      _id\n      estado\n      fecha\n      placa\n    }\n  }\n"): (typeof documents)["\n  subscription Actividades {\n    Actividades {\n      _id\n      estado\n      fecha\n      placa\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;