import express from 'express'
import destinationController from '../controllers/destinationController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
export const destinationRouter = express.Router()

/**
 * @swagger
 * /destinations/create/{tripId}:
 *   post:
 *     summary: Create a new destination
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - location
 *               - description
 *               - dateVisited
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *                 maxLength: 500
 *               dateVisited:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Destination created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
destinationRouter.post("/create/:tripId", isAuthenticated, destinationController.createDestination)

/**
 * @swagger
 * /destinations/all/{tripId}:
 *   get:
 *     summary: Get all destinations for a trip
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of destinations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 destinations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Destination'
 *       400:
 *         description: Trip not found
 */
destinationRouter.get("/all/:tripId", isAuthenticated, destinationController.getDestinations)

/**
 * @swagger
 * /destinations/{id}:
 *   delete:
 *     summary: Delete a destination
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Destination deleted successfully
 *       400:
 *         description: Bad request or not authorized
 *       401:
 *         description: Unauthorized
 */
destinationRouter.delete("/:id", isAuthenticated, destinationController.deleteDestination)

/**
 * @swagger
 * /destinations/update/{id}:
 *   patch:
 *     summary: Update a destination
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               dateVisited:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Destination updated successfully
 *       400:
 *         description: Bad request or not authorized
 *       401:
 *         description: Unauthorized
 */
destinationRouter.patch("/update/:id", isAuthenticated, destinationController.updateDestination)

/**
 * @swagger
 * /destinations/{id}:
 *   get:
 *     summary: Get destination by ID
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Destination found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 destination:
 *                   $ref: '#/components/schemas/Destination'
 *       400:
 *         description: Destination not found
 */
destinationRouter.get("/:id", isAuthenticated, destinationController.getDestination)