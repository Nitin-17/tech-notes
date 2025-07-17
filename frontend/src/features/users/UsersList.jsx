import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User.jsx";
//import useTitle from "../../hooks/useTitle";

const UsersList = () => {
  //useTitle("techNotes: Users List");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-600 text-center font-semibold mt-4">
        {error?.data?.message || "Something went wrong"}
      </p>
    );
  }

  if (isSuccess) {
    const { ids } = users;

    return (
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border border-gray-300 rounded-md shadow-sm text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-700">Username</th>
              <th className="px-4 py-2 font-medium text-gray-700">Roles</th>
              <th className="px-4 py-2 font-medium text-gray-700">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ids?.length > 0 ? (
              ids.map((userId) => <User key={userId} userId={userId} />)
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

export default UsersList;
