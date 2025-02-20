import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { AiFillEdit } from "@react-icons/all-files/ai/AiFillEdit";
import { AiFillDelete } from "@react-icons/all-files/ai/AiFillDelete";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const ListEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await listEmployees();
      setEmployees(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch employees. Please try again later.");
      console.error("Error fetching employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto my-8 px-4 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-6"></div>
          <div className="w-full overflow-x-auto shadow-lg rounded-lg">
            <div className="h-64 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto my-8 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const addEmployee = () => {
    navigate("/add-employee");
  };

  const updateEmployee = (employeeId: number) => {
    navigate(`/update-employee/${employeeId}`);
  };

  const handleDelete = async (employeeId: number) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteEmployee(employeeId);
      await fetchEmployees();
      setError(null);
    } catch (error) {
      setError("Failed to delete employee. Please try again later.");
      console.error("Error deleting employee:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">
        List of Employees ({employees.length})
      </h2>

      <div
        onClick={addEmployee}
        className="bg-gray-500 hover:bg-gray-400 w-fit cursor-pointer text-white p-2 rounded-lg mb-2"
      >
        Add Employee
      </div>
      {employees.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No employees found.</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Id
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  First Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Last Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  E-mail
                </th>
                <th
                  colSpan={2}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {employee.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {employee.firstName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {employee.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {employee.email}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-700">
                    <AiFillEdit
                      color="green"
                      size={24}
                      className="cursor-pointer"
                      onClick={() => updateEmployee(employee.id)}
                    />
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-700">
                    <AiFillDelete
                      color="red"
                      size={24}
                      className={`cursor-pointer hover:opacity-80 transition-opacity ${
                        isDeleting ? "opacity-50" : ""
                      }`}
                      onClick={() => !isDeleting && handleDelete(employee.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListEmployee;
