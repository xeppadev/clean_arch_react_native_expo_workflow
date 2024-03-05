import { useMutation } from "@apollo/client";
import { REGISTRAR_FACTURA } from "@/src/Data/repositories/facturas/facturasrepositorio";

export function useRegistrarFacturaViewModel() {
  const [registrarFactura, { data, loading, error }] =
    useMutation(REGISTRAR_FACTURA);

  return {
    registrarFactura,
    data: data?.crear_factura,
    loading,
    error,
  };
}
