const express = require('express');
const boardController = require('../Controllers/boardController');
const route = express.Router();
const auth = require('../Middlewares/auth');

route.get('/members', auth.verifyAdminToken, boardController.getMembers);
route.get('/:boardId/members', auth.verifyAdminToken, boardController.getBoardMember);
route.post('/:boardId/add-member', auth.verifyAdminToken, boardController.addMember);
route.post('/:boardId/remove-member', auth.verifyAdminToken, boardController.removeMember);
route.post('/create', auth.verifyAdminToken, boardController.create);
route.put('/:boardId/update-board-title', auth.verifyAdminToken, boardController.updateBoardTitle);
route.put('/:boardId/update-background', auth.verifyAdminToken, boardController.updateBackground);
route.put('/:boardId/update-board-description', auth.verifyAdminToken, boardController.updateBoardDescription);
route.get('/:id', auth.verifyToken, boardController.getById);
route.get('/:id/activity', auth.verifyToken, boardController.getActivityById);
route.get('/', auth.verifyToken, boardController.getAll);

module.exports = route;
