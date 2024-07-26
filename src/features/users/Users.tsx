import { useCallback, useEffect } from "react";
import withLoadingAndError from "../../hoc/withLoadingAndError";
import type { IUser } from "./user.type";
import { useSetUser } from "./UserContext";
import { useFetchAllUsers } from "./userHooks";

interface UsersProps {
  users: IUser[];
}


const Users: React.FC<UsersProps> = ({ users }) => {
  const setUserContext =  useSetUser();

  // Need to put setUser in useCallback because setUser is used in useEffect
  const setUser = useCallback((userId: string) => {
    const user = users.find(u => u.id.toString() === userId.toString());
    if (user) {
      setUserContext(user);
    }
  }, [users, setUserContext]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    setUser(userId)
  }

  useEffect(() => {
    if (users && users.length > 0) {
      setUser(users[0].id);
    }
  }, [users, setUser]);



  return (
    <select name="users" id="users"  onChange={handleChange}>
      {users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
      ))}
    </select>
  );
};

const UsersWithLoadingAndError = withLoadingAndError(Users);


export const UsersContainer = () => {
  const { isPending, error, data: users } = useFetchAllUsers()

  

  return (
    <UsersWithLoadingAndError
      isPending={isPending}
      error={error}
      users={users || []}
    />
  );
}