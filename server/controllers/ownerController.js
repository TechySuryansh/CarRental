import User from "../models/User.js";
import fs from "fs";

export const changeRoleToOwner = async (req, res) => {         
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" });
        res.json({ success: true, message: "Now you can list cars" });
    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}


//api to list car

export const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        let car=JSON.parse(req.body.carData)
        const imageFile=req.file

        const fileBuffer=fs.readFileSync(imageFile.path)
        await imageKit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:"/cars"
        })
    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

