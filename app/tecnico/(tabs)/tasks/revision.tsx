import ProgramadosPage from "@/src/Presentation/views/tecnico/Tasks/programadosPage";
import { useCalendarViewModel } from "@/src/Presentation/viewmodels/suscrripciones/calendarViewModel";

export default function ScreenRevision() {
  const { mantenimientosRevision } = useCalendarViewModel();
  return <ProgramadosPage data={mantenimientosRevision} />;
}
