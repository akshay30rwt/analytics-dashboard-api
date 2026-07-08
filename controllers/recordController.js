const Record = require('../models/Record');
const AppError = require('../utils/AppError');

const addRecord = async (req, res, next) => {
    try {
        const record = await Record.create(req.body);

        return res.status(201).json({
            message: Array.isArray(req.body)
                ? `${record.length} records added successfully`
                : "Record added successfully",
            data: record
        });
    }
    catch(error) {
        next(error);
    }
}

const getAllRecords = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const records = await Record.find().sort({ date: -1 }).skip(skip).limit(limit);

        const total = await Record.countDocuments();

        return res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total/limit),
            data: records
        });
    }
    catch(error) {
        next(error);
    }
}

const getRecordById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const record = await Record.findById(id);

        if(!record) {
            throw new AppError(`No Record for this ID: ${id}`, 404);
        }

        return res.status(200).json(record);
    }
    catch(error) {
        next(error);
    }
}

const updateRecord = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedRecord = await Record.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if(!updatedRecord) {
            throw new AppError(`No Record for this ID: ${id}`, 404); 
        }

        return res.status(200).json({
            message: 'Record updated successfully',
            updatedRecord
        });
    }
    catch(error) {
        next(error);
    }
}

const deleteRecord = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedRecord = await Record.findByIdAndDelete(id);

        if(!deletedRecord) {
            throw new AppError(`No Record for this ID: ${id}`, 404);
        }

        return res.status(200).json({
            message: 'Record deleted successfully',
            deletedRecord
        });
    }
    catch(error) {
        next(error);
    }
}

const getRevenueByCategory = async (req, res, next) => {
    try {
        const records = await Record.aggregate([
            {
                $group: {
                    _id: '$category',
                    revenue: { $sum: { $multiply: ['$amount', '$quantity'] } },
                    productCount: { $sum: 1 },
                    unitsSold: { $sum: '$quantity' }
                }
            },
            { $sort: { revenue: -1 } },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    revenue: 1,
                    productCount: 1,
                    unitsSold: 1
                }
            }
        ]);

        return res.status(200).json(records);
    }
    catch(error) {
        next(error);
    }
}

const getRevenueByRegion = async (req, res, next) => {
    try {
        const records = await Record.aggregate([
            {
                $group: {
                    _id: '$region',
                    revenue: { $sum: { $multiply: ['$amount', '$quantity'] } },
                    productCount: { $sum: 1 },
                    unitsSold: { $sum: '$quantity' }
                }
            },
            { $sort: { revenue: -1 } },
            {
                $project: {
                    _id: 0,
                    region: '$_id',
                    revenue: 1,
                    productCount: 1,
                    unitsSold: 1
                }
            }
        ]);

        return res.status(200).json(records);
    }
    catch(error) {
        next(error);
    }
}

const getMonthlyRevenue = async (req, res, next) => {
    try {
        const { year } = req.query;

        if(!year) {
            throw new AppError("Year query parameter is required", 400);
        }

        const records = await Record.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(`${year}-01-01`),
                        $lt: new Date(`${Number(year) + 1}-01-01`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$date' },
                    revenue: { $sum: { $multiply: ['$amount', '$quantity'] } },
                    productCount: { $sum: 1 },
                    unitsSold: { $sum: '$quantity' }
                }
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    month: '$_id',
                    revenue: 1,
                    productCount: 1,
                    unitsSold: 1
                }
            }
        ]);

        return res.status(200).json(records);
    }
    catch(error) {
        next(error);
    }
}

const getTop5Revenue = async (req, res, next) => {
    try {
        const records = await Record.aggregate([
    {
        $addFields: {
            revenue: { $multiply: ["$amount", "$quantity"] }
        }
    },
    { $sort: { revenue: -1 } },
    { $limit: 5 },
    {
        $project: {
            _id: 0,
            product: 1,
            category: 1,
            region: 1,
            soldBy: 1,
            amount: 1,
            quantity: 1,
            revenue: 1,
            date: 1
        }
    }
]);

        return res.status(200).json(records)
    }
    catch(error) {
        next(error);
    }
}

const getSummary = async (req, res, next) => {
    try {
        const [ summary ] = await Record.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $multiply: ['$amount', '$quantity'] } },
                    recordsCount: { $sum: 1 },
                    avgAmount: { $avg: '$amount' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    recordsCount: 1,
                    avgAmount: { $round: ['$avgAmount', 2] }
                }
            }
        ]);

        return res.status(200).json(summary);
    }
    catch(error) {
        next(error);
    }
}

module.exports = { addRecord, getAllRecords, getRecordById, updateRecord, deleteRecord, getRevenueByCategory, getRevenueByRegion, getMonthlyRevenue, getTop5Revenue, getSummary};