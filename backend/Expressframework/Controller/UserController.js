const db = require("../Database/DB");


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


module.exports ={getdata}