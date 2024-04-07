import ProgramadosPage from "@/src/Presentation/views/tecnico/Tasks/programadosPage";
import { useCalendarViewModel } from "@/src/Presentation/viewmodels/suscripciones/calendarViewModel";

export default function ScreenProgrmados() {
  const { mantenimientosAprobadosyRevision } = useCalendarViewModel();
  return <ProgramadosPage data={mantenimientosAprobadosyRevision} />;
}
