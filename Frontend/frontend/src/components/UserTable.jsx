
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    MaterialReactTable,
    useMaterialReactTable
} from 'material-react-table';

function UserTable() {
    const navigate = useNavigate();
   

    const [users, setUsers] = useState([]);

  
  const getData = async () => {
    try {
        const token = localStorage.getItem("token");

        console.log("Token:", token);

        const response = await axios.get("http://localhost:5000/api/user",
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

        console.log("Server response:", response.data);

        setUsers(
            response.data.data
                ? [response.data.data]
                : []
        );

    } catch (err) {
        console.log("Error:", err);
        console.log("Server response:", err.response?.data);

        
        if (err.response?.status === 401 || err.response?.status === 404) {
            localStorage.removeItem("token");
            navigate("/", { replace: true });
        }
    }
};


    useEffect(() => {
        getData();
       
    }, []);

    const columns = useMemo(
        () => [
             {
            header: 'S.No',
            Cell: ({ row }) => row.index + 1,
        },
            {
                accessorKey: 'userID',
                header: 'User ID',
            },
            {
                accessorKey: 'userName',
                header: 'User Name',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'address',
                header: 'Address',
            },
            {
                accessorKey: 'phoneNumber',
                header: 'Phone Number',
            },
            {
                accessorKey: 'gender',
                header: 'Gender',
                editVariant:"select",
                editSelectOptions:[
                    "Male","Female"
                ]
            },
            {
                accessorKey: 'status',
                header: 'Status',
            },
            {
                accessorKey: 'createdBy',
                header: 'createdby',
            },
             
                {
                accessorKey: 'updatedDate',
                header: 'Updateddate',
            },
                {
                accessorKey: 'createdDate',
                header: 'createddate',
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: users,
    });

    return (
        <div className="m-5">
         <center>
            <h2 className="dash" >Welcome User!</h2>
            </center>

            <MaterialReactTable table={table} />
        </div>
    );
}

export default UserTable;
