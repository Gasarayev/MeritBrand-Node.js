const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

/**
 * @swagger
 * tags:
 *   name: About
 *   description: About information API
 */

// Get all about info
/**
 * @swagger
 * /api/about:
 *   get:
 *     summary: Get about information
 *     tags: [About]
 *     responses:
 *       200:
 *         description: About information retrieved successfully
 */
router.get('/about', aboutController.getAboutInfo);

// Get about info by ID
/**
 * @swagger
 * /api/about/{id}:
 *   get:
 *     summary: Get about information by ID
 *     tags: [About]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The about ID
 *     responses:
 *       200:
 *         description: About information retrieved successfully
 *       404:
 *         description: About info not found
 */
router.get('/about/:id', aboutController.getAboutInfoById);

// Create new about info with image upload
/**
 * @swagger
 * /api/about:
 *   post:
 *     summary: Create new about information
 *     tags: [About]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             example:
 *               title: "About Us"
 *               description: "This is the about section of the site."
 *     responses:
 *       201:
 *         description: About information created successfully
 */
router.post('/about', aboutController.uploadAboutImage, aboutController.createAboutInfo);

// Update about info by ID
/**
 * @swagger
 * /api/about/{id}:
 *   put:
 *     summary: Update about information by ID
 *     tags: [About]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The about ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               title: "Updated About Us"
 *               description: "This is the updated about section of the site."
 *     responses:
 *       200:
 *         description: About information updated successfully
 *       404:
 *         description: About info not found
 */
router.put('/about/:id', aboutController.updateAboutInfoById);

// Delete about info by ID
/**
 * @swagger
 * /api/about/{id}:
 *   delete:
 *     summary: Delete about information by ID
 *     tags: [About]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The about ID
 *     responses:
 *       204:
 *         description: About information deleted successfully
 *       404:
 *         description: About info not found
 */
router.delete('/about/:id', aboutController.deleteAboutInfoById);

module.exports = router;
