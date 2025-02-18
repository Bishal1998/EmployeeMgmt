const ListEmployee = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">
        List of Employees
      </h2>

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
            </tr>
          </thead>
          <tbody>
            {/* Sample data rows */}
            {[1, 2, 3].map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-700">001</td>
                <td className="px-6 py-4 text-sm text-gray-700">John</td>
                <td className="px-6 py-4 text-sm text-gray-700">Doe</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  john.doe@example.com
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployee;
