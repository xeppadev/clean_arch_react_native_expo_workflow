import { gql } from "@/src/generated";
export const PERFILES_USERS = gql(/* GraphQL */ `
  query Obtener_usuario_por_username($username: String!) {
    obtener_usuario_por_username(username: $username) {
      email
      name
      nivelUser
      username
      _id
    }
  }
`);

export const PERFILES_MUTATION = gql(/* GraphQL */ `
  mutation Actualizar_datos_usuario(
    $oldUsername: String!
    $newUsername: String!
    $newName: String!
    $newEmail: String!
    $newPassword: String!
  ) {
    actualizar_datos_usuario(
      oldUsername: $oldUsername
      newUsername: $newUsername
      newName: $newName
      newEmail: $newEmail
      newPassword: $newPassword
    )
  }
`);
