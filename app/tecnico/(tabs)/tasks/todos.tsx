import ProgramadosPage from "@/src/Presentation/views/tecnico/Tasks/programadosPage";
import { useCalendarViewModel } from "@/src/Presentation/viewmodels/suscrripciones/calendarViewModel";

export default function ScreenTodos() {
  const { TodosMantenimientos } = useCalendarViewModel();

  return <ProgramadosPage data={TodosMantenimientos} />;
}
