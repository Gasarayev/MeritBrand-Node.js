const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');

/**
 * @swagger
 * tags:
 *   name: Slider
 *   description: Slider information API
 */

// Get all slider info
/**
 * @swagger
 * /api/slider:
 *   get:
 *     summary: Get slider information
 *     tags: [Slider]
 *     responses:
 *       200:
 *         description: Slider information retrieved successfully
 */
router.get('/slider', sliderController.getSliderInfo);

// Create new slider info
/**
 * @swagger
 * /api/slider:
 *   post:
 *     summary: Create new slider information
 *     tags: [Slider]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               title: "Slide Title"
 *               image: "image_url.jpg"
 *     responses:
 *       201:
 *         description: Slider information created successfully
 */
router.post('/slider', sliderController.createSliderInfo);

// Delete slider info by ID
/**
 * @swagger
 * /api/slider/{id}:
 *   delete:
 *     summary: Delete slider information by ID
 *     tags: [Slider]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The slider ID
 *     responses:
 *       204:
 *         description: Slider information deleted successfully
 *       404:
 *         description: Slider info not found
 */
router.delete('/slider/:id', sliderController.deleteSliderInfoById);

module.exports = router;
