const express = require('express');
const router = express.Router();
const { getInfo, getAll, getSingle, create, update, deleteSingle } = require('../controllers/persons');

router.route('/info')
      .get(getInfo)

router.route('/api/persons')
      .get(getAll)
      .post(create)

router.route('/api/persons/:id')
      .get(getSingle)
      .put(update)
      .delete(deleteSingle)

module.exports = router;