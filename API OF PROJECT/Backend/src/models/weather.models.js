import mongoose from "mongoose";

//Weather Schema 

const weatherSchema = new mongoose.Schema({
    city: { type: String, required: true, },
    country: { type: String },
    temperature: { type: Number, required: true },
    description: { type: String },
    wind_speed: { type: Number },
    humidity: { type: Number, required: true },
})

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;