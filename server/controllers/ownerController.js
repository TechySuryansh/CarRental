import imageKit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
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
        let car = JSON.parse(req.body.carData)
        const imageFile = req.file

        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/cars"
        })
        var optimizedImageurl = imageKit.url({
            path: response.filePath,
            transformation: [{

                width: "1280",
            }, {
                quality: "auto"
            }, { format: "web" }]
        })
        const image = optimizedImageurl
        await Car.create({ ...car, image, owner: _id })
        res.json({ success: true, message: "Car Listed Successfully" });
    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}



//api to list owner car

export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id });
        res.json({ success: true, cars });
    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}


//api to toggle car availability

export const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user
        const { carId } = req.body
        const car = await Car.findById(carId)
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Car not found" })
        }
        car.isAvailable = !car.isAvailable
        await car.save()
        res.json({ success: true, message: "Car availability updated" })
    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}


//api to delete car
export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user
        const { carId } = req.body
        const car = await Car.findById(carId)
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }
        car.owner = null
        car.isAvailable = false
        await car.save()
        res.json({ success: true, message: "Car Removed" })
    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

//api to get dashboard data


export const getDashboardData = async (req, res) => {
    try {
        const { _id } = req.user
        // Removed role check as it's already handled by middleware or not needed if we trust req.user from protect middleware

        const cars = await Car.find({ owner: _id })
        const bookings = await Booking.find({ owner: _id }).populate("car").populate("user").sort({ createdAt: -1 })
        const pendingBookings = bookings.filter(booking => booking.status === "pending")
        const completedBookings = bookings.filter(booking => booking.status === "completed")

        //caculate monthly revenue from bookings where status is completed
        const monthlyRevenue = bookings.filter(booking => booking.status === "completed").reduce((acc, booking) => acc + booking.price, 0)
        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        }
        res.json({ success: true, dashboardData })


    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

//api to update user image
export const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user
        const imageFile = req.file

        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/users"
        })
        var optimizedImageurl = imageKit.url({
            path: response.filePath,
            transformation: [{

                width: "400",
            }, {
                quality: "auto"
            }, { format: "webp" }]
        })
        const image = optimizedImageurl
        const user = await User.findByIdAndUpdate(_id)
        user.image = image
        await user.save()
        res.json({ success: true, message: "User image updated", image })
    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}