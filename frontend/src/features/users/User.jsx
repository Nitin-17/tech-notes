import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId }) => {
  const user = useSelector((state) => {
    console.log("Redux state", state);
    return selectUserById(state, userId);
  });

  console.log("User is", user);

  if (!user) return null;

  return (
    <tr>
      <td className="px-4 py-2 text-gray-800">{user.username}</td>
      <td className="px-4 py-2 text-gray-600">{user.roles.join(", ")}</td>
      <td className="px-4 py-2">
        <button className="text-blue-600 hover:underline">Edit</button>
      </td>
    </tr>
  );
};

export default User;
