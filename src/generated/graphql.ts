/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CalendarAndMantenimientosDto = {
  __typename?: 'CalendarAndMantenimientosDTO';
  calendar?: Maybe<Array<Maybe<MaintenanceCountDto>>>;
  mantenimientos?: Maybe<Array<Maybe<HomeMantDto>>>;
};

export type CarInfo = {
  __typename?: 'CarInfo';
  Mantenimientos?: Maybe<Array<MantenimientoInfo>>;
  Puntaje: Scalars['Float']['output'];
  cliente: Scalars['String']['output'];
  fechaSoat: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  kmActual: Scalars['Float']['output'];
  placa: Scalars['String']['output'];
  propietario: Scalars['String']['output'];
  vigenciaContrato: Scalars['DateTime']['output'];
};

export type ClienteDto = {
  __typename?: 'ClienteDto';
  _id?: Maybe<Scalars['String']['output']>;
  contratos?: Maybe<Array<Maybe<ContratoDto>>>;
  direccion: Scalars['String']['output'];
  documentos?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  email: Scalars['String']['output'];
  nombre: Scalars['String']['output'];
  nombreCliente?: Maybe<Scalars['String']['output']>;
  numeroContacto?: Maybe<Scalars['Float']['output']>;
  rubro: Scalars['String']['output'];
  ruc: Scalars['String']['output'];
};

export type ClienteInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  contratos?: InputMaybe<Array<InputMaybe<ContratoInput>>>;
  direccion: Scalars['String']['input'];
  documentos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  email: Scalars['String']['input'];
  nombre: Scalars['String']['input'];
  nombreCliente?: InputMaybe<Scalars['String']['input']>;
  numeroContacto?: InputMaybe<Scalars['Float']['input']>;
  rubro: Scalars['String']['input'];
  ruc: Scalars['String']['input'];
};

export type ContratoDto = {
  __typename?: 'ContratoDto';
  fechaFin: Scalars['DateTime']['output'];
  fechaInicio: Scalars['DateTime']['output'];
  numeroContrato: Scalars['String']['output'];
};

export type ContratoInput = {
  fechaFin: Scalars['DateTime']['input'];
  fechaInicio: Scalars['DateTime']['input'];
  numeroContrato: Scalars['String']['input'];
};

export type CreateCarDto = {
  cliente: Scalars['String']['input'];
  fechaRevision: Scalars['DateTime']['input'];
  fechaSoat: Scalars['DateTime']['input'];
  kmRegistroInicial: Scalars['Int']['input'];
  placa: Scalars['String']['input'];
  propietario: Scalars['String']['input'];
  puntaje?: InputMaybe<Scalars['Int']['input']>;
  tipoContrato: Scalars['String']['input'];
  vigenciaContrato: Scalars['DateTime']['input'];
};

export type CreateFacturaDto = {
  detraccion?: InputMaybe<Scalars['Float']['input']>;
  documentos?: InputMaybe<Array<Scalars['String']['input']>>;
  fecha: Scalars['DateTime']['input'];
  igv?: InputMaybe<Scalars['Float']['input']>;
  involucrado?: InputMaybe<Scalars['String']['input']>;
  monto: Scalars['Float']['input'];
  notificacion: Scalars['Boolean']['input'];
  numeroFactura?: InputMaybe<Scalars['String']['input']>;
  tipo: Scalars['String']['input'];
};

export type CreateRepuestoDto = {
  cantidad: Scalars['Float']['input'];
  cantidadReserva: Scalars['Float']['input'];
  marca: Scalars['String']['input'];
  precio: Scalars['Float']['input'];
  producto: Scalars['String']['input'];
};

export type CreateUserDto = {
  clienteAsociado?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nivelUser: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GeneralReportDto = {
  __typename?: 'GeneralReportDto';
  detracciones: Scalars['Float']['output'];
  egresosFact: Scalars['Float']['output'];
  egresosTotalFact: Scalars['Float']['output'];
  igvEgresos: Scalars['Float']['output'];
  igvIngresos: Scalars['Float']['output'];
  ingresoFact: Scalars['Float']['output'];
  mesYear: Scalars['String']['output'];
};

export type GetForPlacasDto = {
  __typename?: 'GetForPlacasDto';
  _id: Scalars['String']['output'];
  cliente: Scalars['String']['output'];
  fechaSoat: Scalars['DateTime']['output'];
  kmActual: Scalars['Float']['output'];
  placa: Scalars['String']['output'];
  propietario: Scalars['String']['output'];
  tipoContrato: Scalars['String']['output'];
};

export type GetPlacasDto = {
  __typename?: 'GetPlacasDto';
  _id: Scalars['String']['output'];
  cliente: Scalars['String']['output'];
  fechaSoat: Scalars['DateTime']['output'];
  placa: Scalars['String']['output'];
  propietario: Scalars['String']['output'];
  tipoContrato: Scalars['String']['output'];
};

export type HomeAdminDto = {
  __typename?: 'HomeAdminDTO';
  cantidadProgramada: Scalars['Int']['output'];
  cantidadTotal: Scalars['Int']['output'];
  mantenimientos: Array<MantenimientoInfoDto2>;
};

export type MaintenanceCountDto = {
  __typename?: 'MaintenanceCountDto';
  cantidad?: Maybe<Scalars['Float']['output']>;
  dayMes?: Maybe<Scalars['String']['output']>;
};

export type MantenimientoInfo = {
  __typename?: 'MantenimientoInfo';
  fecha: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  repuestosUsados: Scalars['Float']['output'];
  tipo: Scalars['String']['output'];
};

export type MantenimientoInfoDto = {
  __typename?: 'MantenimientoInfoDto';
  anotaciones?: Maybe<Scalars['String']['output']>;
  cliente?: Maybe<Scalars['String']['output']>;
  diagnostico?: Maybe<Scalars['String']['output']>;
  diagnosticoFinal?: Maybe<Scalars['String']['output']>;
  documentos?: Maybe<Array<Scalars['String']['output']>>;
  estado?: Maybe<Scalars['String']['output']>;
  fecha?: Maybe<Scalars['DateTime']['output']>;
  fechaFin?: Maybe<Scalars['DateTime']['output']>;
  fechaInicio?: Maybe<Scalars['DateTime']['output']>;
  fechaSoat?: Maybe<Scalars['DateTime']['output']>;
  kmMedido?: Maybe<Scalars['Float']['output']>;
  kmPrevio?: Maybe<Scalars['Float']['output']>;
  placa: Scalars['String']['output'];
  repuestos?: Maybe<Array<RepuestoType>>;
  repuestosAjuste?: Maybe<Array<RepuestoType>>;
  tecnico?: Maybe<Scalars['String']['output']>;
  tipo?: Maybe<Scalars['String']['output']>;
};

export type MantenimientoInfoDto2 = {
  __typename?: 'MantenimientoInfoDto2';
  _id: Scalars['String']['output'];
  anotaciones?: Maybe<Scalars['String']['output']>;
  cliente?: Maybe<Scalars['String']['output']>;
  diagnostico?: Maybe<Scalars['String']['output']>;
  diagnosticoFinal?: Maybe<Scalars['String']['output']>;
  documentos?: Maybe<Array<Scalars['String']['output']>>;
  estado?: Maybe<Scalars['String']['output']>;
  fecha?: Maybe<Scalars['DateTime']['output']>;
  fechaFin?: Maybe<Scalars['DateTime']['output']>;
  fechaInicio?: Maybe<Scalars['DateTime']['output']>;
  fechaSoat?: Maybe<Scalars['DateTime']['output']>;
  kmMedido?: Maybe<Scalars['Float']['output']>;
  kmPrevio?: Maybe<Scalars['Float']['output']>;
  placa: Scalars['String']['output'];
  repuestos?: Maybe<Array<RepuestoType2>>;
  repuestosAjuste?: Maybe<Array<RepuestoType2>>;
  tecnico?: Maybe<Scalars['String']['output']>;
  tipo?: Maybe<Scalars['String']['output']>;
};

export type MantenimientoInfoDto56 = {
  __typename?: 'MantenimientoInfoDto56';
  _id: Scalars['String']['output'];
  anotaciones?: Maybe<Scalars['String']['output']>;
  cliente?: Maybe<Scalars['String']['output']>;
  diagnostico?: Maybe<Scalars['String']['output']>;
  diagnosticoFinal?: Maybe<Scalars['String']['output']>;
  documentos?: Maybe<Array<Scalars['String']['output']>>;
  estado?: Maybe<Scalars['String']['output']>;
  fecha?: Maybe<Scalars['DateTime']['output']>;
  fechaFin?: Maybe<Scalars['DateTime']['output']>;
  fechaInicio?: Maybe<Scalars['DateTime']['output']>;
  fechaSoat?: Maybe<Scalars['DateTime']['output']>;
  kmMedido?: Maybe<Scalars['Float']['output']>;
  kmPrevio?: Maybe<Scalars['Float']['output']>;
  placa: Scalars['String']['output'];
  repuestos?: Maybe<Array<RepuestoType>>;
  repuestosAjuste?: Maybe<Array<RepuestoType>>;
  tecnico?: Maybe<Scalars['String']['output']>;
  tipo?: Maybe<Scalars['String']['output']>;
};

export type MantenimientoResult = {
  __typename?: 'MantenimientoResult';
  cantidad: Scalars['Int']['output'];
  mantenimientos: Array<MantenimientoInfoDto>;
};

export type MesRepuestos = {
  __typename?: 'MesRepuestos';
  mesYear: Scalars['String']['output'];
  otros?: Maybe<ProductoConsumido>;
  prod1?: Maybe<ProductoConsumido>;
  prod2?: Maybe<ProductoConsumido>;
  prod3?: Maybe<ProductoConsumido>;
  prod4?: Maybe<ProductoConsumido>;
  prod5?: Maybe<ProductoConsumido>;
};

export type MonthlySummaryDto = {
  __typename?: 'MonthlySummaryDto';
  detraccion: Scalars['Float']['output'];
  fact: Scalars['Float']['output'];
  igv: Scalars['Float']['output'];
  igvOtros: Scalars['Float']['output'];
  mesYear: Scalars['String']['output'];
  otros: Scalars['Float']['output'];
  personalTotal: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Esta Función agrega un nuevo contrato al cliente en la base de datos y retorna el documento actualizado */
  Agregar_Contrato: ClienteDto;
  /** Esta Función agrega un nuevo salario y una fecha al personal en la base de datos y retorna el documento actualizado */
  Agregar_Salario_Fecha: PersonalDto;
  /** Esta Función elimina un cliente de la base de datos y retorna un booleano indicando si se eliminó correctamente o no */
  borrar_Cliente: Scalars['Boolean']['output'];
  /** Esta Función elimina un personal de la base de datos y retorna un booleano indicando si se eliminó correctamente o no */
  borrar_Personal: Scalars['Boolean']['output'];
  /** Esta función cambia el estado de un mantenimiento a "revision" y realiza una corrección de repuestos, esta corrección es quitar los repuestos que estaban reservados */
  cambiar_estado_revision: Scalars['Boolean']['output'];
  /** Esta función actualiza el campo diagnosticoFinal de un mantenimiento y cambia su estado a "completado" */
  completar_mantenimiento: Scalars['String']['output'];
  /** Esta Función registra un nuevo cliente en la base de datos y retorna el id del documento creado */
  crear_Cliente: Scalars['String']['output'];
  /** Esta Función registra un nuevo persoanl en la base de datos y retorna el id del documento creado */
  crear_Personal: Scalars['String']['output'];
  /** Esta Función registra un auto en la base de datos */
  crear_auto: Scalars['String']['output'];
  /** Esta Función registra una factura en la base de datos y retorna el id de la factura creada */
  crear_factura: Scalars['String']['output'];
  /** Esta Función registra un repuesto en la base de datos y retorna true si se registro correctamente */
  crear_repuesto: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  /** Esta funcion programa un mantenimiento */
  programar_mantenimiento: Scalars['String']['output'];
  /** Esta funcion registra un mantenimiento que no haya sido previamente programado, ademas en el apartado de repuestos, solo pide entregar una id y la cantidad */
  regisrar_mantenimiento_no_programado: Scalars['String']['output'];
  /** Esta Función registra un mantenimiento que ya haya sido previamente programado, ademas en el apartado de repuestos, pide entregar una id y la cantidad */
  regisrar_mantenimiento_programado: Scalars['String']['output'];
  updatePassword: Scalars['Boolean']['output'];
  /** Esta Función se usa internamente para actualizar repuestos en la base de datos y retorna true si se actualizo correctamente, no usar en el cliente */
  verficar_repuestos: Scalars['Boolean']['output'];
};


export type MutationAgregar_ContratoArgs = {
  contrato: ContratoInput;
  id: Scalars['String']['input'];
};


export type MutationAgregar_Salario_FechaArgs = {
  id: Scalars['String']['input'];
  salarioFecha: SalarioFechaInput;
};


export type MutationBorrar_ClienteArgs = {
  id: Scalars['String']['input'];
};


export type MutationBorrar_PersonalArgs = {
  id: Scalars['String']['input'];
};


export type MutationCambiar_Estado_RevisionArgs = {
  cambiosSolicitados: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationCompletar_MantenimientoArgs = {
  diagnosticoFinal: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationCrear_ClienteArgs = {
  cliente: ClienteInput;
};


export type MutationCrear_PersonalArgs = {
  input: PersonalInput;
};


export type MutationCrear_AutoArgs = {
  createCarInput: CreateCarDto;
};


export type MutationCrear_FacturaArgs = {
  createFacturaInput: CreateFacturaDto;
};


export type MutationCrear_RepuestoArgs = {
  createRepuestoInput: CreateRepuestoDto;
};


export type MutationCreateUserArgs = {
  username: CreateUserDto;
};


export type MutationProgramar_MantenimientoArgs = {
  programarMantInput: PrograMantenimientoDto;
};


export type MutationRegisrar_Mantenimiento_No_ProgramadoArgs = {
  updateOneMantenimientoInput: UpdateOneMantenimientoDto;
};


export type MutationRegisrar_Mantenimiento_ProgramadoArgs = {
  registrarMantInput: UpdateMantenimientoDto;
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationVerficar_RepuestosArgs = {
  verifyRepuestoInput: VerifyRepuestoDto;
};

export type PersonalDto = {
  __typename?: 'PersonalDto';
  _id: Scalars['String']['output'];
  documentos?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  email?: Maybe<Scalars['String']['output']>;
  fechaIngreso?: Maybe<Scalars['DateTime']['output']>;
  nombre: Scalars['String']['output'];
  numero?: Maybe<Scalars['Int']['output']>;
  salarioFecha?: Maybe<Array<Maybe<SalarioFechaDto>>>;
};

export type PersonalInput = {
  _id: Scalars['String']['input'];
  documentos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  email?: InputMaybe<Scalars['String']['input']>;
  fechaIngreso?: InputMaybe<Scalars['DateTime']['input']>;
  nombre: Scalars['String']['input'];
  numero?: InputMaybe<Scalars['Int']['input']>;
  salarioFecha?: InputMaybe<Array<InputMaybe<SalarioFechaInput>>>;
};

export type ProductoConsumido = {
  __typename?: 'ProductoConsumido';
  cantidadConsumida: Scalars['Int']['output'];
  producto: Scalars['String']['output'];
};

export type PrograMantenimientoDto = {
  anotaciones: Scalars['String']['input'];
  fecha: Scalars['DateTime']['input'];
  placa: Scalars['String']['input'];
  tecnico: Scalars['String']['input'];
  tipo: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Esta funcion retorna la informacion de un mantenimiento por id */
  Mantenimiento_Info_por_ID: MantenimientoInfoDto;
  /** Esta funcion retorna la informacion de un mantenimiento por placa */
  Mantenimiento_Info_por_Placa: Array<MantenimientoInfoDto56>;
  /** Esta Función retorna la información de un auto ademas de sus mantenimientos (id, fecha, tipo, repuestosUsados) por medio de su placa */
  admin_history_cars: CarInfo;
  /** Esta función retorna una matriz con las fechas de los mantenimientos que tengan de estado "programado" */
  calendar: Array<Scalars['DateTime']['output']>;
  /** Obtiene el resumen mensual de gastos */
  grafica_gastos_generales: Array<MonthlySummaryDto>;
  /** Obtiene el resumen mensual de ingresos y egresos */
  grafica_ingresos_egresos: Array<GeneralReportDto>;
  /** Esta función retorna los repuestos consumidos en los ultimos x meses, para el reporte de repuestos */
  grafica_repuesto_xmeses: Array<MesRepuestos>;
  /** Esta funcion se usa en el home del admin y retorna la cantidad de mantenimientos programados, la cantidad total de mantenimientos y los mantenimientos programados */
  home_admin: HomeAdminDto;
  /** Esta funcion retorna la cantidad de mantenimientos por estado y los mantenimientos (información compleja) por estado y fecha */
  mantenimientoChanges: MantenimientoResult;
  /** Esta Función retorna la información de un cliente en base a su ID */
  obtener_Cliente_ID: ClienteDto;
  /** Esta Función retorna la información de un personal por su id */
  obtener_Personal_Por_Id: PersonalDto;
  /** Esta Función retorna la información de todo el personal en la base de datos */
  obtener_Todo_Personal: Array<PersonalDto>;
  /** Esta Función retorna la información de todos los clientes en la base de datos */
  obtener_Todos_Clientes: Array<ClienteDto>;
  /** Esta Función retorna la información de un auto por medio de su placa */
  obtener_info_for_placa: GetForPlacasDto;
  /** Esta Función retorna la información de los carros (id, placa, cliente, propietarios fechaSoat) */
  obtener_info_placas: Array<GetPlacasDto>;
  /** Esta Función retorna la información de todos los repuestos (id, producto, marca, cantidad, cantidadReserva, precio) */
  obtener_todos_los_repuestos: Array<RepuestoType>;
};


export type QueryMantenimiento_Info_Por_IdArgs = {
  id: Scalars['String']['input'];
};


export type QueryMantenimiento_Info_Por_PlacaArgs = {
  placa: Scalars['String']['input'];
};


export type QueryAdmin_History_CarsArgs = {
  placa: Scalars['String']['input'];
};


export type QueryGrafica_Gastos_GeneralesArgs = {
  inputDate: Scalars['String']['input'];
};


export type QueryGrafica_Ingresos_EgresosArgs = {
  inputDate: Scalars['String']['input'];
};


export type QueryGrafica_Repuesto_XmesesArgs = {
  months: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
};


export type QueryHome_AdminArgs = {
  fecha: Scalars['DateTime']['input'];
};


export type QueryMantenimientoChangesArgs = {
  estado: Scalars['String']['input'];
  fecha: Scalars['DateTime']['input'];
};


export type QueryObtener_Cliente_IdArgs = {
  id: Scalars['String']['input'];
};


export type QueryObtener_Personal_Por_IdArgs = {
  id: Scalars['String']['input'];
};


export type QueryObtener_Info_For_PlacaArgs = {
  placa: Scalars['String']['input'];
};

export type RepuestoDto = {
  __typename?: 'RepuestoDTO';
  cantidad?: Maybe<Scalars['Float']['output']>;
  cantidadReserva?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  marca?: Maybe<Scalars['String']['output']>;
  precio?: Maybe<Scalars['Float']['output']>;
  producto?: Maybe<Scalars['String']['output']>;
};



export type RepuestoType = {
  __typename?: 'RepuestoType';
  cantidad: Scalars['Float']['output'];
  cantidadReserva?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  marca?: Maybe<Scalars['String']['output']>;
  precio?: Maybe<Scalars['Float']['output']>;
  producto?: Maybe<Scalars['String']['output']>;
};

export type RepuestoType2 = {
  __typename?: 'RepuestoType2';
  _id: Scalars['String']['output'];
  cantidad: Scalars['Float']['output'];
  cantidadReserva?: Maybe<Scalars['Float']['output']>;
  marca?: Maybe<Scalars['String']['output']>;
  precio?: Maybe<Scalars['Float']['output']>;
  producto?: Maybe<Scalars['String']['output']>;
};

export type SalarioFechaDto = {
  __typename?: 'SalarioFechaDto';
  fecha: Scalars['DateTime']['output'];
  salario: Scalars['Float']['output'];
};

export type SalarioFechaInput = {
  fecha: Scalars['DateTime']['input'];
  salario: Scalars['Float']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Esta funcion retorna los mantenimientos desde el día de hoy para la pestaña de actividades */
  Actividades: Array<HomeMantDto>;
  /** Esta funcion retorna el calendario de mantenimientos programados del mes, y ademas los mantenimientos para el dia de hoy */
  Calendar_Hoy_Tecnico?: Maybe<CalendarAndMantenimientosDto>;
  Personal: Array<PersonalDto>;
};

export type UpdateMantenimientoDto = {
  Cliente: Scalars['String']['input'];
  _id: Scalars['String']['input'];
  diagnostico: Scalars['String']['input'];
  fecha: Scalars['DateTime']['input'];
  fechaInicio: Scalars['DateTime']['input'];
  fechaSoat: Scalars['DateTime']['input'];
  kmMedido: Scalars['Float']['input'];
  kmPrevio: Scalars['Float']['input'];
  repuestos?: InputMaybe<Array<RepuestoDto>>;
};

export type UpdateOneMantenimientoDto = {
  Cliente: Scalars['String']['input'];
  diagnostico: Scalars['String']['input'];
  fecha: Scalars['DateTime']['input'];
  fechaInicio: Scalars['DateTime']['input'];
  fechaSoat: Scalars['DateTime']['input'];
  kmMedido: Scalars['Float']['input'];
  kmPrevio: Scalars['Float']['input'];
  placa: Scalars['String']['input'];
  repuestos?: InputMaybe<Array<RepuestoDto>>;
  tecnico: Scalars['String']['input'];
  tipo: Scalars['String']['input'];
};

export type VerifyRepuestoDto = {
  repuestos?: InputMaybe<Array<RepuestoDto>>;
};

export type HomeMantDto = {
  __typename?: 'homeMantDTO';
  _id?: Maybe<Scalars['ID']['output']>;
  anotaciones?: Maybe<Scalars['String']['output']>;
  cambiosSolicitados?: Maybe<Scalars['String']['output']>;
  cliente?: Maybe<Scalars['String']['output']>;
  diagnostico?: Maybe<Scalars['String']['output']>;
  diagnosticoFinal?: Maybe<Scalars['String']['output']>;
  documentos?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  estado?: Maybe<Scalars['String']['output']>;
  fecha?: Maybe<Scalars['DateTime']['output']>;
  fechaFin?: Maybe<Scalars['DateTime']['output']>;
  fechaInicio?: Maybe<Scalars['DateTime']['output']>;
  fechaSoat?: Maybe<Scalars['DateTime']['output']>;
  kmMedido?: Maybe<Scalars['Float']['output']>;
  kmPrevio?: Maybe<Scalars['Float']['output']>;
  placa?: Maybe<Scalars['String']['output']>;
  repuestos?: Maybe<Array<Maybe<RepuestoDto>>>;
  repuestosAjuste?: Maybe<Array<Maybe<RepuestoDto>>>;
  tecnico?: Maybe<Scalars['String']['output']>;
  tipo?: Maybe<Scalars['String']['output']>;
};

export type ObtenerInfoPlacasQueryVariables = Exact<{ [key: string]: never; }>;


export type ObtenerInfoPlacasQuery = { __typename?: 'Query', obtener_info_placas: Array<{ __typename?: 'GetPlacasDto', _id: string, cliente: string, fechaSoat: any, placa: string }> };

export type AdminHistoryCarsQueryVariables = Exact<{
  placa: Scalars['String']['input'];
}>;


export type AdminHistoryCarsQuery = { __typename?: 'Query', admin_history_cars: { __typename?: 'CarInfo', Puntaje: number, cliente: string, fechaSoat: any, id: string, kmActual: number, placa: string, propietario: string, vigenciaContrato: any, Mantenimientos?: Array<{ __typename?: 'MantenimientoInfo', fecha: any, id: string, repuestosUsados: number, tipo: string }> | null } };

export type ObtenerPlacasQueryVariables = Exact<{ [key: string]: never; }>;


export type ObtenerPlacasQuery = { __typename?: 'Query', obtener_info_placas: Array<{ __typename?: 'GetPlacasDto', placa: string }> };

export type Query_GetPropietariosQueryVariables = Exact<{ [key: string]: never; }>;


export type Query_GetPropietariosQuery = { __typename?: 'Query', obtener_info_placas: Array<{ __typename?: 'GetPlacasDto', propietario: string }> };

export type Crear_AutoMutationVariables = Exact<{
  createCarInput: CreateCarDto;
}>;


export type Crear_AutoMutation = { __typename?: 'Mutation', crear_auto: string };

export type Obtener_Info_For_PlacaQueryVariables = Exact<{
  placa: Scalars['String']['input'];
}>;


export type Obtener_Info_For_PlacaQuery = { __typename?: 'Query', obtener_info_for_placa: { __typename?: 'GetForPlacasDto', _id: string, fechaSoat: any, kmActual: number, cliente: string } };

export type Obtener_Todos_ClientesQueryVariables = Exact<{ [key: string]: never; }>;


export type Obtener_Todos_ClientesQuery = { __typename?: 'Query', obtener_Todos_Clientes: Array<{ __typename?: 'ClienteDto', nombre: string, nombreCliente?: string | null, _id?: string | null, contratos?: Array<{ __typename?: 'ContratoDto', fechaFin: any } | null> | null }> };

export type Obtener_Cliente_IdQueryVariables = Exact<{
  obtenerClienteIdId: Scalars['String']['input'];
}>;


export type Obtener_Cliente_IdQuery = { __typename?: 'Query', obtener_Cliente_ID: { __typename?: 'ClienteDto', _id?: string | null, direccion: string, documentos?: Array<string | null> | null, email: string, nombre: string, nombreCliente?: string | null, numeroContacto?: number | null, rubro: string, ruc: string, contratos?: Array<{ __typename?: 'ContratoDto', fechaFin: any, fechaInicio: any, numeroContrato: string } | null> | null } };

export type Obtener_Solo_ClientesQueryVariables = Exact<{ [key: string]: never; }>;


export type Obtener_Solo_ClientesQuery = { __typename?: 'Query', obtener_Todos_Clientes: Array<{ __typename?: 'ClienteDto', nombreCliente?: string | null }> };

export type Query_BarChartQueryVariables = Exact<{
  inputDate: Scalars['String']['input'];
}>;


export type Query_BarChartQuery = { __typename?: 'Query', grafica_gastos_generales: Array<{ __typename?: 'MonthlySummaryDto', fact: number, mesYear: string, otros: number, personalTotal: number }> };

export type Mutation_RegistrarFacturaMutationVariables = Exact<{
  createFacturaInput: CreateFacturaDto;
}>;


export type Mutation_RegistrarFacturaMutation = { __typename?: 'Mutation', crear_factura: string };

export type ProgramarMantenimientoMutationVariables = Exact<{
  programarMantInput: PrograMantenimientoDto;
}>;


export type ProgramarMantenimientoMutation = { __typename?: 'Mutation', programar_mantenimiento: string };

export type MantenimientoInfoPorIdQueryVariables = Exact<{
  mantenimientoInfoPorIdId: Scalars['String']['input'];
}>;


export type MantenimientoInfoPorIdQuery = { __typename?: 'Query', Mantenimiento_Info_por_ID: { __typename?: 'MantenimientoInfoDto', anotaciones?: string | null, cliente?: string | null, diagnostico?: string | null, documentos?: Array<string> | null, diagnosticoFinal?: string | null, estado?: string | null, fecha?: any | null, fechaFin?: any | null, fechaInicio?: any | null, fechaSoat?: any | null, kmMedido?: number | null, kmPrevio?: number | null, placa: string, tecnico?: string | null, tipo?: string | null, repuestos?: Array<{ __typename?: 'RepuestoType', cantidad: number, cantidadReserva?: number | null, id: string, marca?: string | null, precio?: number | null, producto?: string | null }> | null, repuestosAjuste?: Array<{ __typename?: 'RepuestoType', cantidad: number, cantidadReserva?: number | null, id: string, marca?: string | null, precio?: number | null, producto?: string | null }> | null } };

export type Mantenimiento_Info_Por_PlacaQueryVariables = Exact<{
  placa: Scalars['String']['input'];
}>;


export type Mantenimiento_Info_Por_PlacaQuery = { __typename?: 'Query', Mantenimiento_Info_por_Placa: Array<{ __typename?: 'MantenimientoInfoDto56', _id: string, tipo?: string | null, fecha?: any | null, estado?: string | null, tecnico?: string | null, kmPrevio?: number | null, fechaSoat?: any | null, anotaciones?: string | null }> };

export type Regisrar_Mantenimiento_ProgramadoMutationVariables = Exact<{
  registrarMantInput: UpdateMantenimientoDto;
}>;


export type Regisrar_Mantenimiento_ProgramadoMutation = { __typename?: 'Mutation', regisrar_mantenimiento_programado: string };

export type Regisrar_Mantenimiento_No_ProgramadoMutationVariables = Exact<{
  updateOneMantenimientoInput: UpdateOneMantenimientoDto;
}>;


export type Regisrar_Mantenimiento_No_ProgramadoMutation = { __typename?: 'Mutation', regisrar_mantenimiento_no_programado: string };

export type PersonalQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PersonalQueryQuery = { __typename?: 'Query', obtener_Todo_Personal: Array<{ __typename?: 'PersonalDto', _id: string, nombre: string, numero?: number | null, salarioFecha?: Array<{ __typename?: 'SalarioFechaDto', fecha: any, salario: number } | null> | null }> };

export type PersonalIdQueryQueryVariables = Exact<{
  obtenerPersonalPorIdId: Scalars['String']['input'];
}>;


export type PersonalIdQueryQuery = { __typename?: 'Query', obtener_Personal_Por_Id: { __typename?: 'PersonalDto', _id: string, documentos?: Array<string | null> | null, email?: string | null, fechaIngreso?: any | null, nombre: string, numero?: number | null, salarioFecha?: Array<{ __typename?: 'SalarioFechaDto', fecha: any, salario: number } | null> | null } };

export type ExampleQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ExampleQueryQuery = { __typename?: 'Query', obtener_todos_los_repuestos: Array<{ __typename?: 'RepuestoType', cantidad: number, cantidadReserva?: number | null, id: string, marca?: string | null, precio?: number | null, producto?: string | null }> };


export const ObtenerInfoPlacasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"obtenerInfoPlacas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obtener_info_placas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"cliente"}},{"kind":"Field","name":{"kind":"Name","value":"fechaSoat"}},{"kind":"Field","name":{"kind":"Name","value":"placa"}}]}}]}}]} as unknown as DocumentNode<ObtenerInfoPlacasQuery, ObtenerInfoPlacasQueryVariables>;
export const AdminHistoryCarsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"adminHistoryCars"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"admin_history_cars"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"placa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placa"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Mantenimientos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fecha"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"repuestosUsados"}},{"kind":"Field","name":{"kind":"Name","value":"tipo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Puntaje"}},{"kind":"Field","name":{"kind":"Name","value":"cliente"}},{"kind":"Field","name":{"kind":"Name","value":"fechaSoat"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kmActual"}},{"kind":"Field","name":{"kind":"Name","value":"placa"}},{"kind":"Field","name":{"kind":"Name","value":"propietario"}},{"kind":"Field","name":{"kind":"Name","value":"vigenciaContrato"}}]}}]}}]} as unknown as DocumentNode<AdminHistoryCarsQuery, AdminHistoryCarsQueryVariables>;
export const ObtenerPlacasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"obtenerPlacas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obtener_info_placas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placa"}}]}}]}}]} as unknown as DocumentNode<ObtenerPlacasQuery, ObtenerPlacasQueryVariables>;
export const Query_GetPropietariosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query_getPropietarios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obtener_info_placas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"propietario"}}]}}]}}]} as unknown as DocumentNode<Query_GetPropietariosQuery, Query_GetPropietariosQueryVariables>;
export const Crear_AutoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Crear_auto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCarInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCarDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"crear_auto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCarInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCarInput"}}}]}]}}]} as unknown as DocumentNode<Crear_AutoMutation, Crear_AutoMutationVariables>;
export const Obtener_Info_For_PlacaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Obtener_info_for_placa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obtener_info_for_placa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"placa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placa"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fechaSoat"}},{"kind":"Field","name":{"kind":"Name","value":"kmActual"}},{"kind":"Field","name":{"kind":"Name","value":"cliente"}}]}}]}}]} as unknown as DocumentNode<Obtener_Info_For_PlacaQuery, Obtener_Info_For_PlacaQueryVariables>;
export const Obtener_Todos_ClientesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Obtener_Todos_Clientes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obtener_Todos_Clientes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nombre"}},{"kind":"Field","name":{"kind":"Name","value":"nombreCliente"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"contratos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fechaFin"}}]}}]}}]}}]} as unknown as DocumentNode<Obtener_Todos_ClientesQuery, Obtener_Todos_ClientesQueryVariables>;
export const Obtener_Cliente_IdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Obtener_Cliente_ID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"obtenerClienteIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obtener_Cliente_ID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"obtenerClienteIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"contratos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fechaFin"}},{"kind":"Field","name":{"kind":"Name","value":"fechaInicio"}},{"kind":"Field","name":{"kind":"Name","value":"numeroContrato"}}]}},{"kind":"Field","name":{"kind":"Name","value":"direccion"}},{"kind":"Field","name":{"kind":"Name","value":"documentos"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"nombre"}},{"kind":"Field","name":{"kind":"Name","value":"nombreCliente"}},{"kind":"Field","name":{"kind":"Name","value":"numeroContacto"}},{"kind":"Field","name":{"kind":"Name","value":"rubro"}},{"kind":"Field","name":{"kind":"Name","value":"ruc"}}]}}]}}]} as unknown as DocumentNode<Obtener_Cliente_IdQuery, Obtener_Cliente_IdQueryVariables>;
export const Obtener_Solo_ClientesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Obtener_Solo_Clientes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obtener_Todos_Clientes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nombreCliente"}}]}}]}}]} as unknown as DocumentNode<Obtener_Solo_ClientesQuery, Obtener_Solo_ClientesQueryVariables>;
export const Query_BarChartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query_BarChart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"grafica_gastos_generales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inputDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fact"}},{"kind":"Field","name":{"kind":"Name","value":"mesYear"}},{"kind":"Field","name":{"kind":"Name","value":"otros"}},{"kind":"Field","name":{"kind":"Name","value":"personalTotal"}}]}}]}}]} as unknown as DocumentNode<Query_BarChartQuery, Query_BarChartQueryVariables>;
export const Mutation_RegistrarFacturaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation_registrarFactura"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createFacturaInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFacturaDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"crear_factura"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createFacturaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createFacturaInput"}}}]}]}}]} as unknown as DocumentNode<Mutation_RegistrarFacturaMutation, Mutation_RegistrarFacturaMutationVariables>;
export const ProgramarMantenimientoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProgramarMantenimiento"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"programarMantInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrograMantenimientoDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programar_mantenimiento"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"programarMantInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"programarMantInput"}}}]}]}}]} as unknown as DocumentNode<ProgramarMantenimientoMutation, ProgramarMantenimientoMutationVariables>;
export const MantenimientoInfoPorIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"mantenimientoInfoPorId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mantenimientoInfoPorIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Mantenimiento_Info_por_ID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mantenimientoInfoPorIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"anotaciones"}},{"kind":"Field","name":{"kind":"Name","value":"cliente"}},{"kind":"Field","name":{"kind":"Name","value":"diagnostico"}},{"kind":"Field","name":{"kind":"Name","value":"documentos"}},{"kind":"Field","name":{"kind":"Name","value":"diagnosticoFinal"}},{"kind":"Field","name":{"kind":"Name","value":"estado"}},{"kind":"Field","name":{"kind":"Name","value":"fecha"}},{"kind":"Field","name":{"kind":"Name","value":"fechaFin"}},{"kind":"Field","name":{"kind":"Name","value":"fechaInicio"}},{"kind":"Field","name":{"kind":"Name","value":"fechaSoat"}},{"kind":"Field","name":{"kind":"Name","value":"kmMedido"}},{"kind":"Field","name":{"kind":"Name","value":"kmPrevio"}},{"kind":"Field","name":{"kind":"Name","value":"placa"}},{"kind":"Field","name":{"kind":"Name","value":"repuestos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cantidad"}},{"kind":"Field","name":{"kind":"Name","value":"cantidadReserva"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marca"}},{"kind":"Field","name":{"kind":"Name","value":"precio"}},{"kind":"Field","name":{"kind":"Name","value":"producto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repuestosAjuste"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cantidad"}},{"kind":"Field","name":{"kind":"Name","value":"cantidadReserva"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marca"}},{"kind":"Field","name":{"kind":"Name","value":"precio"}},{"kind":"Field","name":{"kind":"Name","value":"producto"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tecnico"}},{"kind":"Field","name":{"kind":"Name","value":"tipo"}}]}}]}}]} as unknown as DocumentNode<MantenimientoInfoPorIdQuery, MantenimientoInfoPorIdQueryVariables>;
export const Mantenimiento_Info_Por_PlacaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Mantenimiento_Info_por_Placa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placa"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Mantenimiento_Info_por_Placa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"placa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placa"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"tipo"}},{"kind":"Field","name":{"kind":"Name","value":"fecha"}},{"kind":"Field","name":{"kind":"Name","value":"estado"}},{"kind":"Field","name":{"kind":"Name","value":"tecnico"}},{"kind":"Field","name":{"kind":"Name","value":"kmPrevio"}},{"kind":"Field","name":{"kind":"Name","value":"fechaSoat"}},{"kind":"Field","name":{"kind":"Name","value":"anotaciones"}}]}}]}}]} as unknown as DocumentNode<Mantenimiento_Info_Por_PlacaQuery, Mantenimiento_Info_Por_PlacaQueryVariables>;
export const Regisrar_Mantenimiento_ProgramadoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Regisrar_mantenimiento_programado"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registrarMantInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMantenimientoDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regisrar_mantenimiento_programado"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registrarMantInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registrarMantInput"}}}]}]}}]} as unknown as DocumentNode<Regisrar_Mantenimiento_ProgramadoMutation, Regisrar_Mantenimiento_ProgramadoMutationVariables>;
export const Regisrar_Mantenimiento_No_ProgramadoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Regisrar_mantenimiento_no_programado"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateOneMantenimientoInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOneMantenimientoDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"regisrar_mantenimiento_no_programado"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOneMantenimientoInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateOneMantenimientoInput"}}}]}]}}]} as unknown as DocumentNode<Regisrar_Mantenimiento_No_ProgramadoMutation, Regisrar_Mantenimiento_No_ProgramadoMutationVariables>;
export const PersonalQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PersonalQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obtener_Todo_Personal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"nombre"}},{"kind":"Field","name":{"kind":"Name","value":"numero"}},{"kind":"Field","name":{"kind":"Name","value":"salarioFecha"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fecha"}},{"kind":"Field","name":{"kind":"Name","value":"salario"}}]}}]}}]}}]} as unknown as DocumentNode<PersonalQueryQuery, PersonalQueryQueryVariables>;
export const PersonalIdQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PersonalIDQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"obtenerPersonalPorIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obtener_Personal_Por_Id"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"obtenerPersonalPorIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"documentos"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fechaIngreso"}},{"kind":"Field","name":{"kind":"Name","value":"nombre"}},{"kind":"Field","name":{"kind":"Name","value":"numero"}},{"kind":"Field","name":{"kind":"Name","value":"salarioFecha"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fecha"}},{"kind":"Field","name":{"kind":"Name","value":"salario"}}]}}]}}]}}]} as unknown as DocumentNode<PersonalIdQueryQuery, PersonalIdQueryQueryVariables>;
export const ExampleQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExampleQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obtener_todos_los_repuestos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cantidad"}},{"kind":"Field","name":{"kind":"Name","value":"cantidadReserva"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marca"}},{"kind":"Field","name":{"kind":"Name","value":"precio"}},{"kind":"Field","name":{"kind":"Name","value":"producto"}}]}}]}}]} as unknown as DocumentNode<ExampleQueryQuery, ExampleQueryQueryVariables>;
