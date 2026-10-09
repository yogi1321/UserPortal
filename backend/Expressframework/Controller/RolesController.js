const db = require("../Database/DB");

// Finds the real primary-key column of the `roles` table (roleid, id, role_id ...)
// so update / delete work no matter what the column is called.
const getPrimaryKey = (callback) => {
    db.query("SHOW KEYS FROM roles WHERE Key_name = 'PRIMARY'", (err, keys) => {
        if (err) return callback(err);
        if (!keys.length) {
            return callback(new Error(
                "The roles table has no PRIMARY KEY. Run: ALTER TABLE roles ADD COLUMN roleid INT AUTO_INCREMENT PRIMARY KEY FIRST;"
            ));
        }
        callback(null, keys[0].Column_name);
    });
};

const createroles = async (req, res) => {
    const { rolename, pages} = req.body;

    if (!rolename || !rolename.trim()) {
        return res.status(400).json({ message: "rolename is required" })
    }

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

            return res.status(500).json({
                message: "Not data",
                data: err,
            })
        }
        else {
            getPrimaryKey((keyErr, pk) => {
                const data = keyErr
                    ? result
                    : result.map((row) => ({ ...row, roleid: row[pk] }));

                res.status(200).json({
                    message: "View data",
                    data
                })
            })
        }


    })

}


const updateroles = (req, res) => {
    const { roleid } = req.params;
    const { rolename, pages } = req.body;

    getPrimaryKey((keyErr, pk) => {
        if (keyErr) {
            console.log("Primary key error:", keyErr);
            return res.status(500).json({ message: keyErr.message, error: keyErr });
        }

        db.query(
            "UPDATE roles SET rolename = ?, pages = ? WHERE ?? = ?",
            [rolename, pages, pk, roleid],
            (err, result) => {
                if (err) {
                    console.log("Database Update Error:", err);
                    return res.status(500).json({ message: err.sqlMessage || "Update failed", error: err });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Record not found" });
                }
                return res.status(200).json({ message: "Updated successfully", data: result });
            }
        );
    });
};

const deleteroles = (req, res) => {
    const { roleid } = req.params;

    getPrimaryKey((keyErr, pk) => {
        if (keyErr) {
            console.log("Primary key error:", keyErr);
            return res.status(500).json({ message: keyErr.message, error: keyErr });
        }

        db.query("DELETE FROM roles WHERE ?? = ?", [pk, roleid], (err, result) => {
            if (err) {
                console.log("Database Delete Error:", err);
                return res.status(500).json({ message: err.sqlMessage || "Delete failed", error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Record not found" });
            }
            return res.status(200).json({ message: "Deleted Data", datas: result });
        });
    });
};


module.exports ={createroles,getroles,updateroles,deleteroles}