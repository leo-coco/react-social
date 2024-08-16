import { useCallback, useEffect } from "react";
import withLoadingAndError from "../../hoc/withLoadingAndError";
import type { IUser } from "./user.type";
import { useSetUser } from "./UserContext";
import { useFetchAllUsers } from "./userHooks";
import { Select } from "antd";

interface UsersProps {
  users: IUser[];
  onChange: (userId:string) => void;
}


export const Users: React.FC<UsersProps> = ({ users, onChange }) => {
  return (
    <Select
      defaultValue={users[0]?.firstName}
      onChange={onChange}
      options={users.map(user => ({
        id: user.id,
        value: user.id.toString(),
        label: user.firstName,
      }))}
    >
    </Select>
  );
};

const UsersWithLoadingAndError = withLoadingAndError(Users);
export const UsersContainer = () => {
  const { isPending, error, data: users } = useFetchAllUsers();
  const setUserContext =  useSetUser();

  const setUser = useCallback((userId: string) => {
    if (users) {
      const user = users.find(u => u.id.toString() === userId.toString());
      if (user) {
        setUserContext(user);
      }
    }
  }, [users, setUserContext]);
  

  useEffect(() => {
    if (users) {
      setUser(users[0].id.toString());
    }
  }, [users, setUser]);

  return (
    <UsersWithLoadingAndError
      isPending={isPending}
      error={error}
      users={users || []}
      onChange={setUser}
    />
  );
}