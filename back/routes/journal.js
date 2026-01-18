import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import journalController from '../controllers/journalController.js'
export const journalRouter = express.Router()

/**
 * @swagger
 * /journals/{destId}:
 *   post:
 *     summary: Create a new journal entry
 *     tags: [Journals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: destId
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
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               mood:
 *                 type: string
 *                 enum: [happy, neutral, sad, excited, relaxed]
 *                 default: neutral
 *     responses:
 *       201:
 *         description: Journal created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
journalRouter.post("/:destId", isAuthenticated, journalController.createJournal)

/**
 * @swagger
 * /journals/update/{id}:
 *   patch:
 *     summary: Update a journal entry
 *     tags: [Journals]
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
 *               content:
 *                 type: string
 *               mood:
 *                 type: string
 *                 enum: [happy, neutral, sad, excited, relaxed]
 *     responses:
 *       201:
 *         description: Journal updated successfully
 *       400:
 *         description: Bad request or not authorized
 *       401:
 *         description: Unauthorized
 */
journalRouter.patch("/update/:id", isAuthenticated, journalController.updateJournal)

/**
 * @swagger
 * /journals/{id}:
 *   delete:
 *     summary: Delete a journal entry
 *     tags: [Journals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Journal deleted successfully
 *       400:
 *         description: Bad request or not authorized
 *       401:
 *         description: Unauthorized
 */
journalRouter.delete("/:id", isAuthenticated, journalController.deleteJournal)

/**
 * @swagger
 * /journals/all/{destId}:
 *   get:
 *     summary: Get all journals for a destination
 *     tags: [Journals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: destId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of journals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 journals:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Journal'
 *       400:
 *         description: Bad request
 */
journalRouter.get("/all/:destId", isAuthenticated, journalController.getJournals)

/**
 * @swagger
 * /journals/{id}:
 *   get:
 *     summary: Get journal by ID
 *     tags: [Journals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Journal found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 journal:
 *                   $ref: '#/components/schemas/Journal'
 *       400:
 *         description: Journal not found
 */
journalRouter.get("/:id", isAuthenticated, journalController.getJournal)