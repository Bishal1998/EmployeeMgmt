import { updateEmployee, getSingleEmployee } from "../services/EmployeeService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface Employee {
  firstName: string;
  lastName: string;
  email: string;
}

const UpdateEmployee = () => {
  const [formData, setFormData] = useState<Employee>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState<{
    form?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setIsFetching(true);
        const response = await getSingleEmployee(Number(id));
        setFormData(response.data);
      } catch (error) {
        setErrors({
          form: "Failed to fetch employee details. Please try again later.",
        });
        console.error("Error fetching employee:", error);
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      await updateEmployee(formData, Number(id));
      navigate("/employees");
    } catch (error) {
      setErrors({
        form: "Failed to update employee. Please try again later.",
      });
      console.error("Error updating employee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof Employee]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (isFetching) {
    return (
      <div className="w-full max-w-6xl mx-auto my-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="space-y-6">
              <div className="h-10 bg-gray-100 rounded"></div>
              <div className="h-10 bg-gray-100 rounded"></div>
              <div className="h-10 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">Update Employee</h2>

      {errors.form && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>{errors.form}</p>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition-colors
                  ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter first name"
                disabled={isLoading}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition-colors
                  ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter last name"
                disabled={isLoading}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition-colors
                ${errors.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter email address"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 
                focus:ring-4 focus:ring-gray-200 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`whitespace-nowrap px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 
                focus:ring-4 focus:ring-gray-200 transition-colors
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Updating..." : "Update Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
