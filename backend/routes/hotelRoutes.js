const router = require('express').Router();
const hotelController = require('../controller/hotelController');
const { authGuard, adminGuard } = require('../middleware/authGuard');

// Public Routes
router.get('/', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);

// Admin Routes
router.post('/', authGuard, adminGuard, hotelController.createHotel);
router.put('/:id', authGuard, adminGuard, hotelController.updateHotel);
router.delete('/:id', authGuard, adminGuard, hotelController.deleteHotel);
router.post('/:hotelId/rooms', authGuard, adminGuard, hotelController.addRoomToHotel);

// Admin Routes
router.put('/rooms/:id', authGuard, adminGuard, hotelController.updateRoom);
router.delete('/rooms/:id', authGuard, adminGuard, hotelController.deleteRoom);

// Analytics Route
router.get('/analytics', authGuard, adminGuard, hotelController.getAnalytics);

module.exports = router;
