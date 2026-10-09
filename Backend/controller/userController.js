const db =require("../config/db");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken")
require('dotenv').config()
const middleware=require("../middleware/middleware");

const getUsers=async(req,res)=>{

   
    const userID = req.user.userID;
    const sql = "SELECT userID, userName, email, address, phoneNumber, gender, status, createdBy, updatedDate, createdDate FROM users WHERE userID = ?";

    db.query(sql,[userID],(err,result)=>{
        if(err){
            return res.status(500).json({error:err});
        }
        if(result.length === 0){
            return res.status(404).json({message:"User not found"});
        }
    
        return res.status(200).json({data:result[0]});
    })
}
const deleteUsers=(req,res)=>{
    const sql="DELETE FROM users where userID= ?";
    const userID=req.params.userID;
    db.query(sql,[userID],(err,result)=>{
        if(err){
             res.status(500).json({
                message:"failed",
                error:err
            })
        }else{
            res.status(200).json({
                message:"deleted data",
                data:result
            })
        }
    })

}

const addUser = async (req, res) => {

    const {
        userName,
        email,
        password,
        address,
        phoneNumber,
        gender
    } = req.body;

    try {

        const hashpassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users SET ?",
            {
                userName,
                email,
                password: hashpassword,
                address,
                phoneNumber,
                gender,
                status: "Active",
                createdBy: "System"
            },
            (err, result) => {

                if (err) {

                    return res.status(500).json({
                        error: err
                    });

                }

                console.log(result);

                return res.status(200).json({
                    message: "User added successfully",
                    userID: result.insertId
                });

            }
        );

    } catch (error) {

        return res.status(500).json({
            message: "Error while adding user",
            error: error.message
        });

    }
};


const loginUser = async (req, res) => {

    const { email, password } = req.body;
    

    db.query(
        "SELECT * FROM users WHERE email = ?", [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json({ error: err });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const user = result[0];

            const checkPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!checkPassword) {
                return res.status(401).json({
                    message: "Invalid password"
                });
            }
            const token=jwt.sign(
                {
                    userID:user.userID,
                    email:user.email,
                    role:"user"
                },
                process.env.JWT_SECRET,
            )
        
          

            const { password: _pw, ...safeUser } = user; 

            res.status(200).json({
                message: "Login successful",
                data: safeUser,
                token
            });
        }
    );
};


const getMyProfile = (req, res) => {

   
    const userID = req.user.userID;

    const sql = "SELECT userID, userName, email, address, phoneNumber, gender, status, createdBy, updatedDate, createdDate FROM users WHERE userID = ?";

    db.query(sql, [userID], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile fetched successfully",
            user: result[0]
        });
    });
};


module.exports={getUsers,loginUser,deleteUsers, getMyProfile,addUser}
