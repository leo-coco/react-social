import { useCallback, useEffect } from "react";
import withLoadingAndError from "../../hoc/withLoadingAndError";
import type { IUser } from "./user.type";
import { useSetUser } from "./UserContext";
import { useFetchAllUsers } from "./userHooks";
import { Select } from "antd";

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

  const handleChange = (userId: string) => {
    setUser(userId)
  }

  useEffect(() => {
    if (users && users.length > 0) {
      setUser(users[0].id);
    }
  }, [users, setUser]);

  return (
    <Select
      defaultValue={users[0]?.name}
      onChange={handleChange}
      options={users.map(user => ({
        id: user.id,
        value: user.id.toString(),
        label: user.name,
      }))}
    >
    </Select>
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