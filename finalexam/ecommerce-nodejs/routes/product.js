const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, requireAuth } = require('../middleware/auth');

router.use(authenticate);

router.get('/', productController.listAll);

router.get('/my', requireAuth, productController.showMy);

router.get('/create', requireAuth, productController.showCreate);
router.post('/', requireAuth, productController.create);

router.get('/:id/edit', requireAuth, productController.showEdit);
router.put('/:id', requireAuth, productController.update);

router.delete('/:id', requireAuth, productController.delete);

module.exports = router;
