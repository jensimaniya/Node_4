const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticate, requireAuth, requireRole } = require('../middleware/auth');

router.use(authenticate);

router.get('/', categoryController.list);

// only admin can create/delete categories
router.post('/', requireAuth, requireRole('admin'), categoryController.create);
router.delete('/:id', requireAuth, requireRole('admin'), categoryController.delete);

module.exports = router;
