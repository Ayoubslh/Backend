const Expert = require('../model/expert');
const AppError = require('../utils/appError');

exports.getAllExperts = async (req, res) => {
    try {
        const experts = await Expert.find();
        res.status(200).json({
            status: "success",
            data: {
                experts,
            }
        })
    } catch (error) {
        res.status(400).json({
            error,
        })
    }
}

exports.getExpertById = async (req, res, next) => {
    console.log(req.params.id);
    const expert = await Expert.findOne({ _id: req.params.id });
    console.log(expert);
    if (!expert) {
        return next(new AppError("user not found", 404));

    }
    res.status(200).json({
        status: "successe",
        expert,
    })
}

exports.updateExpertMe = async (req, res, next) => {
    try {
        const expert = await Expert.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({
            status: "success",
            data: {
                expert,
            }
        })
    } catch (error) {
        next(error)
    }

}

exports.deleteExpertMe = async (req, res, next) => {
    try {
        await Expert.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
        })
    } catch (error) {
        next(error)
    }
}