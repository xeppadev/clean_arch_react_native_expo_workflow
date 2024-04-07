import ProgramadosPage from "@/src/Presentation/views/tecnico/Tasks/programadosPage";
import { useCalendarViewModel } from "@/src/Presentation/viewmodels/suscripciones/calendarViewModel";

export default function ScreenRevision() {
  const { mantenimientosProgramados } = useCalendarViewModel();
  return <ProgramadosPage data={mantenimientosProgramados} />;
}
