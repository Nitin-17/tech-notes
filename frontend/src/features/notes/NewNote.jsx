import NewNoteForm from "./NewNoteForm";
import { selectAllUsers, useGetUsersQuery } from "../users/usersApiSlice";
import { useSelector } from "react-redux";
//import useTitle from '../../hooks/useTitle'

const NewNote = () => {
  //useTitle("techNotes: New Note");
  const users = useSelector(selectAllUsers);

  const content = users ? <NewNoteForm users={users} /> : <p>Loading...</p>;

  return content;
};
export default NewNote;
