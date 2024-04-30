const express = require("express");
const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurants,
  getRestaurantslimitfour,
} = require("../controllers/restaurant");

const reservationRouter = require("./reservations");
const reviewRouter = require('./reviews');
const menuRouter = require('./menus');
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");


router.use('/:restaurantId/reservations', reservationRouter);
router.use('/:restaurantId/reviews', reviewRouter);
router.use('/:restaurantId/menus', menuRouter);
router
.route("/limit")
.get(getRestaurantslimitfour)
router
  .route("/")
  .get(getRestaurants) 
  .post(protect, authorize("admin"), createRestaurant);
  
router
  .route("/search/:searchId")
  .get(searchRestaurants);
  
router
  .route("/:id")
  .get(getRestaurant)
  .put(protect, authorize("admin"), updateRestaurant)
  .delete(protect, authorize("admin"), deleteRestaurant);
  
module.exports = router;
