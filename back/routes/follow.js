import express from "express";
import User from "../models/User.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const FollowRouter = express.Router();

/**
 * @swagger
 * /follow/{id}:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to follow
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully followed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 */
FollowRouter.post("/follow/:id", isAuthenticated, async (req, res) => {
  const me = req.user;
  const userToFollow = await User.findById(req.params.id);

  if (!userToFollow) return res.status(404).send({ message: "User not found" });

  if (!me.following.includes(userToFollow._id)) {
    me.following.push(userToFollow._id);
    userToFollow.followers.push(me._id);

    await me.save();
    await userToFollow.save();
  }

  res.send({ message: `You are now following ${userToFollow.username}` });
});

/**
 * @swagger
 * /unfollow/{id}:
 *   post:
 *     summary: Unfollow a user
 *     tags: [Follow]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to unfollow
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully unfollowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 */
FollowRouter.post("/unfollow/:id", isAuthenticated, async (req, res) => {
  const me = req.user;
  const userToUnfollow = await User.findById(req.params.id);

  if (!userToUnfollow) return res.status(404).send({ message: "User not found" });

  me.following = me.following.filter((id) => !id.equals(userToUnfollow._id));
  userToUnfollow.followers = userToUnfollow.followers.filter((id) => !id.equals(me._id));

  await me.save();
  await userToUnfollow.save();

  res.send({ message: `You unfollowed ${userToUnfollow.username}` });
});

export default FollowRouter;

