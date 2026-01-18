import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import commentController from "../controllers/commentController.js";
export const commentRouter = express.Router()

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - targetType
 *               - targetId
 *             properties:
 *               text:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *               targetType:
 *                 type: string
 *                 enum: [Journal, Photo, Destination]
 *               targetId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
commentRouter.post("/", isAuthenticated, commentController.createComment)

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
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
 *         description: Comment deleted successfully
 *       400:
 *         description: Bad request or not authorized
 *       401:
 *         description: Unauthorized
 */
commentRouter.delete("/:id", isAuthenticated, commentController.deleteComment)

/**
 * @swagger
 * /comments/update/{id}:
 *   patch:
 *     summary: Update a comment
 *     tags: [Comments]
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
 *               text:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Bad request or not authorized
 *       401:
 *         description: Unauthorized
 */
commentRouter.patch("/update/:id", isAuthenticated, commentController.updateComment)

/**
 * @swagger
 * /comments/{targetType}/{targetId}:
 *   get:
 *     summary: Get all comments for a target
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: targetType
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Journal, Photo, Destination]
 *       - in: path
 *         name: targetId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 */
commentRouter.get("/:targetType/:targetId", commentController.getComments)