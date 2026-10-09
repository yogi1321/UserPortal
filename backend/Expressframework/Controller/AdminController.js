const db = require("../Database/DB")

const createrole = async (req, res) => {
    const { rolename, pages, status, createdby, updatedby,email,phonenumber,gender} = req.body;

    db.query("INSERT INTO admin SET ?", { rolename, pages, status, createdby, updatedby,email,phonenumber,gender }, (err, result) => {

        if (err) {
            res.status(500).json({
                error: err
            })


        } else {
            var result = res.status(200).json({
                result: result,
                message: "uploaded",

            })
            console.log(result)

        }
    })
}


const getdata = async (req, res) => {
    db.query("SELECT *FROM admin", (err, result) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Not data",
                data: err,
            })
        }
        else {
            res.status(200).json({
                message: "View data",
                data: result
            })
        }


    })

}


const update = (req, res) => {

    const { roleid } = req.params;

    const {  rolename,  email,  phonenumber,  gender,  pages,  createdby,  updatedby } = req.body;

    console.log("Role ID:", roleid);
    console.log("Request body:", req.body);

    const sql = `
        UPDATE admin SET  rolename = ?, createdby = ?, updatedby = ?, email = ?, phonenumber = ?, gender = ?, pages = ? WHERE roleid = ?`;

    const values = [rolename,createdby,updatedby,email,phonenumber,gender,pages, roleid
    ];

    console.log("SQL values:", values);

    db.query(sql, values, (err, result) => {

        if (err) {
            console.log("Database Update Error:", err);

            return res.status(500).json({
                message: "Update failed",
                error: err
            });
        }

        console.log("Database result:", result);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Record not found"
            });
        }

        return res.status(200).json({
            message: "Updated successfully",
            data: result
        });
    });
};



const deleteitems = (req, res) => {
    const sql = "DELETE FROM admin WHERE roleid = ?";
    const roleid = req.params.roleid;

    db.query(sql, [roleid], (err, data) => {
        if (err) {
            res.status(500).json({
                message: "failed",
                error: err
            })
        } else {
            res.status(200).json({
                message: "Deleted Data",
                datas: data
            })
        }
    })

}



module.exports = { createrole, getdata, update, deleteitems };