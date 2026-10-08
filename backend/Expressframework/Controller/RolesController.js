const db = require("../Database/DB");

const createroles = async (req, res) => {
    const { rolename, pages} = req.body;

    db.query("INSERT INTO roles SET ?", { rolename, pages}, (err, result) => {

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

const getroles = async (req, res) => {
    db.query("SELECT *FROM roles", (err, result) => {
        if (err) {
            console.log(err);

            const res = await.res.status(500).json({
                message: "Not data",
                data: err,
            })
            console.log(res)
        }
        else {
            res.status(200).json({
                message: "View data",
                data: result
            })
        }


    })

}


module.exports ={createroles,getroles}