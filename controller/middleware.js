import TripPlanner from '../model/tripPlanner.js'

export const searchTrip = (req, res) => {
  const { destination, type, duration } = req.query;
  const query = {};
  if (destination) {
    query.destination = destination;
  }
  if (type) {
    query.type = type;
  }
  if (duration) {
    query.duration = duration;
  }
  TripPlanner.find(query)
    .then((trips) => res.json(trips))
    .catch((err) => res.status(500).json(err));
};



export const addcustomizeEntity = (req, res) => {
 const {id}=req.params;
  const { activities } = req.body;
  TripPlanner.findByIdAndUpdate(userId, { id,activities })
    .then((trip) => res.json(trip))
    .catch((err) => res.status(500).json(err));
};

export const deletecustomizeEntity = (req, res) => {
  const {id}=req.params;
  const { activities} = req.body;
  TripPlanner.findByIdAndDelete(userId, {id, activities })
    .then((trip) => res.json(trip))
    .catch((err) => res.status(500).json(err));
};


export const saveItinerary = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  TripPlanner.findByIdAndUpdate(userId, { id })
    .then((trip) => res.json(trip))
    .catch((err) => res.status(500).json(err));
};



export const viewItinerary = (req, res) => {
  const { userId } = req.body;
  TripPlanner.find({ userId })
    .then((trips)  => res.json(trips))
    .catch((err) => res.status(500).json(err));
};

export const deleteItinerary = (req, res) => {
  const { id} = req.params;
  const { userId } = req.body;
  TripPlanner.findByIdAndDelete(userId,{id})
    .then((trip) => res.json(trip))
    .catch((err) => res.status(500).json(err));
};

export const modifyItinerary = (req, res) => {
  const {id } = req.params;
  const { destination, type, duration, activities,userId } = req.body;
  TripPlanner.findByIdAndUpdate(userId, { destination, type, duration, activities,id })
    .then((trip) => res.json(trip))
    .catch((err) => res.status(500).json(err));
};

export const shareItinerary = (req, res) => {
  // Get the user's id, the itinerary id, and the recipient's id from the request body
  const userId = req.body.userId;
  const itineraryId = req.body.itineraryId;
  const recipientId = req.body.recipientId;

  // Find the itinerary in the database using the user's id and itinerary id
  TripPlanner.findOne(
    { userId: userId, itineraryId: itineraryId },
    (err, itinerary) => {
      if (err) {
        console.log("Error finding itinerary:", err);
        res.status(500).send("Error finding itinerary");
        return;
      }

      // If the itinerary is not found, return an error
      if (!itinerary) {
        res.status(404).send("Itinerary not found");
        return;
      }

      // If the itinerary is found, send a notification to the recipient with a link to the itinerary
      sendNotification(
        recipientId,
        `${userId} has shared an itinerary with you: ${itinerary.name}`
      );
      res.send("Itinerary shared");
    }
  );
};
