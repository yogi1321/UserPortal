import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate()
  const [userData, setUserData] = useState([]);

  const getdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/view"
      );

      setUserData(response.data.data);
    } catch (error) {
      console.log("Get Error:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  
  const handleUpdate = async (row, values) => {
  try {
    const roleid = row.original.roleid;

    const data = {
      rolename: values.rolename,
      email: values.email,
      phonenumber: values.phonenumber,
      gender: values.gender,
      pages: values.pages,
      createdby: values.createdby,
      updatedby: values.updatedby,
    };

    console.log("Role ID:", roleid);
    console.log("Sending:", data);

    const response = await axios.put(
      `http://localhost:5000/admin/updatedata/${roleid}`,
      data
    );

    console.log("Update response:", response.data);

    alert("Updated successfully");

    await getdata();

    return true;

  } catch (error) {
    console.log(
      "Update Error:",
      error.response?.data || error.message
    );

    alert("Update failed");

    return false;
  }
};
  const handleDelete = async (roleid) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this record?"
      );

      if (!confirmDelete) {
        return;
      }

      await axios.delete(
        `http://localhost:5000/admin/delete/${roleid}`
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
        accessorKey: "roleid",
        header: "Role ID",
        enableEditing: false,
      },

      {
        accessorKey: "rolename",
        header: "User Name",
      },

      {
        accessorKey: "email",
        header: "Email",
      },

      {
        accessorKey: "phonenumber",
        header: "Phone Number",
      },

    
      {
        accessorKey: "gender",
        header: "Gender",
        editVariant: "select",
        editSelectOptions: [
          {
            value: "Male",
            label: "Male",
          },
          {
            value: "Female",
            label: "Female",
          },
          
        ],
      },

      {
        accessorKey: "pages",
        header: "Pages",
      },

      {
        accessorKey: "updatedby",
        header: "Updated By",
      },

      {
        accessorKey: "createdby",
        header: "Created By",
      },

      {
        accessorKey: "updatedate",
        header: "Updated Date",
        enableEditing: false,
      },

      {
        accessorKey: "createdate",
        header: "Created Date",
        enableEditing: false,
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

  onEditingRowSave: async ({ row, values, table }) => {
    const saved = await handleUpdate(row,values);

    if (saved) {
      table.setEditingRow(null);
    }
  },

  onEditingRowCancel: ({ table }) => {
    table.setEditingRow(null);
  },

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
    <div className="flex min-h-screen bg-gray-100">

    
      <div className="w-64 shrink-0 bg-gray-800 p-5 text-white">

        <h1 className="mb-8 text-4xl font-bold">
          Admin
        </h1>

        <ul className="space-y-3">

          <li>
            <button
              className="w-full rounded-lg bg-gray-700 px-4 py-3 text-center hover:bg-blue-600"
              onClick={() => navigate("/")}
            >
              Dashboard
            </button>
          </li>

          <li>
            <button 
              className="w-full rounded-lg bg-gray-700 px-4 py-3 text-center hover:bg-blue-600"
              onClick={() => navigate("/user")}            >
              Users
            </button>
          </li>

          <li>
            <button
              className="w-full rounded-lg bg-gray-700 px-4 py-3 text-center hover:bg-blue-600"
              onClick={() => navigate("/roles")}
            >
              Roles
            </button>
          </li>

        </ul>

        <div className="mt-8">
          <button
            onClick={() => {
             
              window.location.href = "/";
            }}
            className="w-full rounded p-3 text-center text-red-400 hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>

      </div>

 
      <div className="min-w-0 flex-1 p-6">

        <h2 className="mb-5 text-2xl font-bold">
          Admin Dashboard
        </h2>

        <p className="mb-6 text-gray-600">
          Welcome, Admin
        </p>

        <div className="w-full">
          <MaterialReactTable table={table} />
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;