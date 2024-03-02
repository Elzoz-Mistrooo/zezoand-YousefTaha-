import connectDB from '../DB/connection.js'
// import authRouter from './modules/auth/auth.router.js'
import doctorRouter from './modules/Doctor/doctor.router.js'
import patientRouter from './modules/Patient/Patient.router.js'
import createAppointment from './modules/appointment/appointment.router.js'
// import userRouter from './modules/user/user.router.js'
import { globalErrorHandling } from './utils/errorHandling.js'
import morgan from 'morgan'




const initApp = (app, express) => {


    if (process.env.MOOD == "DEV") {
        app.use(morgan("dev"))
    } else {
        app.use(morgan("combined"))
    }


    -
        //convert Buffer Data
        app.use(express.json({}))
    //Setup API Routing 
    // app.use('/auth', authRouter)
    app.use('/doctor', doctorRouter)
    app.use('/patient', patientRouter)
    app.use('/appointment', createAppointment)

    // app.use(`/user`, userRouter)
    // app.use("")
    // app.use(adminRoutes"));
    // app.use(doctorRoutes"));


    app.all('*', (req, res, next) => {
        res.send("In-valid Routing Plz check url  or  method")
    })
    connectDB()
    app.use(globalErrorHandling)

}



export default initApp