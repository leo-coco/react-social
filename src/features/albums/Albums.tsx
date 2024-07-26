import withLoadingAndError from "../../hoc/withLoadingAndError";
import { useUser } from "../users/UserContext";
import type { IAlbum } from "./album.type";
import { useFetchAlbumsByUser } from "./albumHooks"

interface AlbumProps {
  albums: IAlbum[];
}

const Albums: React.FC<AlbumProps> = ({ albums }) => {
  return (
    <>
      <ul>
        { albums.map(u => (<li>{u.title} user: {u.userId}</li>))}
      </ul>
    </>
  );
};

const AlbumsWithLoadingAndError = withLoadingAndError(Albums);

export const AlbumsContainer = () => {
  const userContext = useUser();
  const { isPending, error, data: albums } = useFetchAlbumsByUser(userContext?.id)




  return (
    <AlbumsWithLoadingAndError
    isPending={isPending}
    error={error}
    albums={albums || []}
    />
  )
}