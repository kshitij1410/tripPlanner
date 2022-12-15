import mongoose from 'mongoose';

// Define the trip planner schema
const tripPlannerSchema = new mongoose.Schema({
    destination: String,
    type: String,
    duration: Number,
    activities: [String]
  });

  
  // Create the trip planner model
  const tripPlanner = mongoose.model('tripPlanner', tripPlannerSchema);

  export default tripPlanner;
  