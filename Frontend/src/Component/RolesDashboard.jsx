import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useNavigate } from "react-router-dom";

function RolesDashboard() {
  const navigate = useNavigate();
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

 

  const handleCreate = async (values) => {
    try {
      const rolename = values.rolename?.trim();

      if (!rolename) {
        alert("Role name is required");
        return false;
      }

      await axios.post("http://localhost:5000/role/addrole", {
        rolename,
        pages: values.pages?.trim() || "",
      });

      alert("Role added successfully");
      await getdata();
      return true;
    } catch (error) {
      console.log("Add Error:", error.response?.data || error.message);
      alert("Add failed");
      return false;
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
        header: "Role id",
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

  

    createDisplayMode: "modal",

    onCreatingRowSave: async ({ values, table }) => {
      const saved = await handleCreate(values);
      if (saved) {
        table.setCreatingRow(null);
      }
    },

    onCreatingRowCancel: ({ table }) => {
      table.setCreatingRow(null);
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <button
        onClick={() => table.setCreatingRow(true)}
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        + Add Role
      </button>
    ),

    onEditingRowSave: async ({ row, values, table }) => {
      const saved = await handleUpdate(row, values);
      if (saved) {
        table.setEditingRow(null);
      }
    },

    onEditingRowCancel: ({ table }) => {
      table.setEditingRow(null);
    },

  
    
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-4 rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
      >
        ← Back to Dashboard
      </button>

      <h2 className="mb-5 text-2xl font-bold">
        Roles Dashboard
      </h2>

      <MaterialReactTable table={table} />
    </div>
  );
}

export default RolesDashboard;