export class FacturaViewModel {
    // ...
  
    getMantenimientos(isAdmin: string): { label: string, value: string }[] {
      if (isAdmin == "admin") {
        return [
          { label: "Factura a Cliente", value: "Factura a Cliente" },
          { label: "Factura a Propietario Vehicular", value: "Factura a Propietario Vehicular" },
          { label: "Compra Adicional", value: "Compra Adicional" },
        ];
      } else {
        return [
            { label: "Compra Adicional", value: "Compra Adicional" },
            
        ];
      }
    }
  }


 