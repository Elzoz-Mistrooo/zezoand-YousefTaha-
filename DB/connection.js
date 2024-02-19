import mongoose from 'mongoose';

const connectDB = async () => {
    return await mongoose.connect('mongodb+srv://easyclinc:123456ASD@cluster0.t56y4wl.mongodb.net/')
        .then(res => console.log(`DB Connected successfully on .........`))
        .catch(err => console.log(` Fail to connect  DB.........${err} `))
}



export default connectDB;