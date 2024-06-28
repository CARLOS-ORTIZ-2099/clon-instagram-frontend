import { useAuth } from "../context/AuthProvider";


export const Profile = () => {
  const { token} = useAuth()
  console.log( token);

  return (
    <div>Perfil</div>
  )
}
