import ProgramadosPage from "@/src/Presentation/views/tecnico/Tasks/programadosPage";
import { useCalendarViewModel } from "@/src/Presentation/viewmodels/suscrripciones/calendarViewModel";

export default function ScreenAprobados() {
  const { mantenimientosAprobados } = useCalendarViewModel();
  return <ProgramadosPage data={mantenimientosAprobados} />;
}
