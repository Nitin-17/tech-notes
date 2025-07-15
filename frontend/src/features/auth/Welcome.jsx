import { Link } from "react-router-dom";
const WelcomePage = () => {
  // Get today's date and format it
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString(undefined, options);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 animate-fade-in">
          Welcome to TechNotes!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Today is{" "}
          <span className="font-semibold text-indigo-600">{formattedDate}</span>
          .
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            to="/dashboard/notes"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            Go to Notes
          </Link>
          <Link
            to="/dashboard/users"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
          >
            View Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
