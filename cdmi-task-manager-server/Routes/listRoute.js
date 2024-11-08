const express = require('express');
const router = express.Router();
const listController = require('../Controllers/listController');
const auth = require('../Middlewares/auth');

router.put('/:boardId/:listId/update-title', auth.verifyToken, listController.updateListTitle);
router.post('/create', auth.verifyToken, listController.create);
router.get('/:id', auth.verifyToken, listController.getAll);
router.delete('/:boardId/:listId', auth.verifyToken, listController.deleteById);
router.post('/change-card-order', auth.verifyToken, listController.updateCardOrder);
router.post('/change-list-order', auth.verifyToken, listController.updateListOrder);

module.exports = router;
