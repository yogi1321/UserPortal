import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function RolesDashboard() {
  const [userData, setUserData] = useState([]);

  const getdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/role/get"
      );

      setUserData(response.data.data);
    } catch (error) {
      console.log("Get Error:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleDelete = async (roleid) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this record?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `http://localhost:5000/role/delete/${roleid}`
      );

      alert("Deleted successfully");
      getdata();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "S.No",
        Cell: ({ row }) => row.index + 1,
        enableEditing: false,
      },
     
      {
        accessorKey: "rolename",
        header: "Role Name",
      },
      {
        accessorKey: "pages",
        header: "Page",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: userData,

    enableEditing: true,
    editDisplayMode: "row",

    positionActionsColumn: "last",

    renderRowActions: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={() => table.setEditingRow(row)}
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(row.original.roleid)}
          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ),
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="mb-5 text-2xl font-bold">
        Roles Dashboard
      </h2>

      <MaterialReactTable table={table} />
    </div>
  );
}

export default RolesDashboard;