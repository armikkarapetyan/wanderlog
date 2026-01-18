import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import photoController from "../controllers/photoController.js";
import { upload } from "../uploads/upload.js";
export const photoRouter = express.Router()

/**
 * @swagger
 * /photos/upload/{destId}:
 *   post:
 *     summary: Upload a photo
 *     tags: [Photos]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               caption:
 *                 type: string
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 photo:
 *                   $ref: '#/components/schemas/Photo'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
photoRouter.post("/upload/:destId", isAuthenticated, upload.single('photo'), photoController.uploadPhoto)

/**
 * @swagger
 * /photos/{destId}:
 *   get:
 *     summary: Get all photos for a destination
 *     tags: [Photos]
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
 *         description: List of photos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 photos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Photo'
 *       400:
 *         description: Destination not found
 */
photoRouter.get("/:destId", isAuthenticated, photoController.getPhotos)

/**
 * @swagger
 * /photos/{photoId}:
 *   delete:
 *     summary: Delete a photo
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Photo deleted successfully
 *       400:
 *         description: Bad request or not authorized
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized
 */
photoRouter.delete("/:photoId", isAuthenticated, photoController.deletePhoto)