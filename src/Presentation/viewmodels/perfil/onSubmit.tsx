import { usePerfilViewModel } from "./perfilViewModel";
import { useSession } from "@/src/Presentation/hooks/useSession";
import { ActualizarPerfilViewModel } from "./actualizarperfilViewModel";
// Define una interfaz para los valores del formulario
interface FormValues {
  nombre: string;
  username: string;
  email: string;
  password: string;
}

export class ActualizarDatosPerfil {
  // Trae el nombre de la sesión
  session = useSession();
  // Define las mutaciones de Apollo Client para actualizar un perfil.
  actualizarPerfil = ActualizarPerfilViewModel();

  // Define las mutaciones de Apollo Client para actualizar un perfil.
  queryPerfil = usePerfilViewModel(this.session?.session?.toString() || "1");

  async onSubmit(values: FormValues) {
    const result = await this.actualizarPerfil.actualizarPerfil({
      variables: {
        oldUsername: this.session?.session?.toString() || "1",
        newUsername: values.username,
        newName: values.nombre,
        newEmail: values.email,
        newPassword: values.password,
      },
    });
    
  }
}
