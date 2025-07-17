import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { Link } from "react-router-dom";

const User = ({ userId }) => {
  const user = useSelector((state) => {
    return selectUserById(state, userId);
  });

  if (!user) return null;

  return (
    <tr>
      <td className="px-4 py-2 text-gray-800">{user.username}</td>
      <td className="px-4 py-2 text-gray-600">{user.roles.join(", ")}</td>
      <td className="px-4 py-2">
        <Link
          to={`/dashboard/users/${userId}`}
          className="text-blue-600 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default User;
