import express from "express";
import { authenticateToken } from "../controller/jwt-controller.js";
import {
  addcustomizeEntity,
  deletecustomizeEntity,
  deleteItinerary,
  modifyItinerary,
  saveItinerary,
  searchTrip,
  shareItinerary,
  viewItinerary,
} from "../controller/middleware.js";

const router = express.Router();

// Create the search endpoint
router.get("/search", searchTrip);



// Create the customize endpoint
router.post("/customize/:id", addcustomizeEntity);
router.delete("/customize/:id", deletecustomizeEntity);

// Create the save endpoint
router.put("/save/:id", authenticateToken, saveItinerary);

// Create the view endpoint
router.get("/view/:userId", authenticateToken, viewItinerary);

// Create the delete endpoint
router.delete("/delete/:id", authenticateToken, deleteItinerary);

// Create the modify endpoint
router.post("/modify/:id", authenticateToken, modifyItinerary);

router.post("/shareItinerary", authenticateToken,shareItinerary);

export default router;
