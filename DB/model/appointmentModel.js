
import mongoose, { Schema } from 'mongoose'

const appointmentSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },
  appointmentDateTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled', 'available'],
    default: 'available'
  },
  
});

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);

export default AppointmentModel;
