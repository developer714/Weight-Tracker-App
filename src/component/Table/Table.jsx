import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex justify-center mb-2">
      <table className="min-w-full bg-gray-100 rounded-lg">
        <thead>
          <tr className="bg-[#50B498] text-white rounded-lg border-b-4 border-gray-100">
            {columns.map((column, index) => (
              <th
                key={index}
                className="text-sm font-semibold p-2 first:rounded-l-2xl last:rounded-r-2xl whitespace-nowrap"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`text-xs text-gray-700 bg-white border-b-4 border-gray-200 ${
                rowIndex === 0 ? "rounded-t-lg" : ""
              } ${rowIndex === data.length - 1 ? "rounded-b-lg" : ""}`}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`p-2 text-center ${
                    colIndex === 0 ? "rounded-l-lg" : ""
                  } ${
                    colIndex === columns.length - 1 ? "rounded-r-lg" : ""
                  } whitespace-nowrap`}
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
