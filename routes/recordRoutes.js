const express = require('express');
const { recordSchema } = require('../validators/recordValidator');
const validate = require('../middleware/validate');

const { addRecord, getAllRecords, getRecordById, updateRecord, deleteRecord, getRevenueByCategory, getRevenueByRegion, getMonthlyRevenue, getTop5Revenue, getSummary} = require('../controllers/recordController');

const router = express.Router();

router.post('/', validate(recordSchema), addRecord);
router.get('/', getAllRecords);

router.get('/summary/category', getRevenueByCategory);
router.get('/summary/region', getRevenueByRegion);
router.get('/summary/monthly', getMonthlyRevenue);
router.get('/summary/top5', getTop5Revenue);
router.get('/summary/overview', getSummary);

router.get('/:id', getRecordById);
router.put('/:id', validate(recordSchema), updateRecord);
router.delete('/:id', deleteRecord);

module.exports = router;