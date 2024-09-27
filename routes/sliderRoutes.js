const express = require('express');
const { upload, uploadSliderImage, getSliderImages } = require('../controllers/sliderController');

const router = express.Router();

/**
 * @swagger
 * /api/images/upload:
 *   post:
 *     summary: Upload a slider image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               sliderImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Slider image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 filePath:
 *                   type: string
 *       400:
 *         description: Bad Request
 */
router.post('/upload', upload.single('sliderImage'), uploadSliderImage);

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Get all slider images
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: List of slider images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   filename:
 *                     type: string
 *                   url:
 *                     type: string
 */
router.get('/', getSliderImages);

module.exports = router;
