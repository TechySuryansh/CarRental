import Booking from "../models/Booking.js"
import Car from "../models/Car.js"

//function to check car availability and create booking

export const checkAvailability=async(carId,pickupDate,returnDate)=>{
    //check if car is available in the given date range
    const bookings=await Booking.find({car:carId,
        pickupDate:{$lt:returnDate},
        returnDate:{$gt:pickupDate}
    })
    return bookings.length===0                  
    }

    //api to check availability  of car for the givem date and location

    export const checkAvailabilityOfCar=async(req,res)=>{
        try{
            const {location,pickupDate,returnDate}=req.body
            const cars=await Car.find({location,isAvailable:true})

            const availableCarsPromises=cars.map(async(car)=>{
                const isAvailable=await checkAvailability(car._id,new Date(pickupDate),new Date(returnDate))
                return {...car._doc,isAvailable}

            })

            let availableCars=await Promise.all(availableCarsPromises)
            availableCars=availableCars.filter(car=>car.isAvailable===true)
            res.json({success:true,cars:availableCars})
        }
        catch(error){
            console.log(error.message)
            return res.json({success:false,message:error.message})

        }
    }


    //api to create booking

    export const createBooking=async(req,res)=>{                            
        try{
            const {carId,pickupDate,returnDate}=req.body
            const { _id } = req.user;

            const isAvailable=await checkAvailability(carId,new Date(pickupDate),new Date(returnDate))
            if(!isAvailable){
                return res.json({success:false,message:"Car not available for the selected dates"})
            }

            const carData=await Car.findById(carId)

            //calculate price based on no of days
            const picked=new Date(pickupDate)
            const returned=new Date(returnDate)
            const noOfDays=Math.ceil((returned-picked)/(1000*60*60*24))+1
            const price=carData.pricePerDay*noOfDays
            const booking=await Booking.create({car:carId,owner:carData.owner,user:_id,pickupDate,returnDate,price,totalAmount:price})
            res.json({success:true,booking,message:"Booking created successfully"})
        }
        catch(error){
            console.log(error.message)
            return res.json({success:false,message:error.message})

        }
    }


//api to get user bookings

export const getUserBookings=async(req,res)=>{
    try{
        const {_id}=req.user
        const bookings=await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
        res.json({success:true,bookings})
    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})
        
    }
}


//api to get owner bookings

export const getOwnerBookings=async(req,res)=>{
    try{
        if(req.user.role!=="owner"){
            return res.json({success:false,message:"not authorized"})
        }

        const bookings=await Booking.find({owner:req.user._id}).populate("car").populate("user").sort({createdAt:-1})
        res.json({success:true,bookings})       
    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})
        
    }
}

//api to change booking status

export const changeBookingStatus=async(req,res)=>{
    try{
       const {_id}=req.user
       const {bookingId,status}=req.body
       const booking=await Booking.findById(bookingId)
         if(booking.owner.toString()!==_id.toString()){     
            return res.json({success:false,message:"not authorized"})
         }
         booking.status=status
         await booking.save()
         res.json({success:true,message:"Booking status updated"})
    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})
        
    }
}

//api to delete booking (cancel booking by user)

export const deleteBooking=async(req,res)=>{
    try{
        const {_id}=req.user
        const {bookingId}=req.body
        const booking=await Booking.findById(bookingId)
        if(!booking){
            return res.json({success:false,message:"Booking not found"})
        }
        if(booking.user.toString()!==_id.toString()){
            return res.json({success:false,message:"Not authorized"})
        }
        if(booking.status==="completed"){
            return res.json({success:false,message:"Cannot delete completed booking"})
        }
        await booking.deleteOne()
        res.json({success:true,message:"Booking cancelled successfully"})
    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}

