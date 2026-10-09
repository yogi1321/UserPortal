import React from 'react'
import axios from "axios";
import { useState,useEffect,useMemo} from 'react';
import { useNavigate } from "react-router-dom";
import {MaterialReactTable,useMaterialReactTable,} from "material-react-table";

function UserDashbaoard() {
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
  })

  return (
    <div className="min-h-screen bg-gray-100 p-6">
          <button
            onClick={() => navigate("/")}
            className="mb-4 rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
          >
            ← Back to Dashboard
          </button>
    
          <h2 className="mb-5 text-2xl font-bold">
            User Dashboard
          </h2>
    
          <MaterialReactTable table={table} />
        </div>
      );
    }
    
 
export default UserDashbaoard