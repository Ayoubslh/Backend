const Claims = require('./../model/Claim');
const AppError = require('./../utils/appError');

const mongoose = require('mongoose')



exports.getAllClaims = async (req, res) => {

    const claims = await Claims.find();
    res.status(200).json({
        status: 'success',
        data: { claims }
    });


}

exports.getUserClaims = async (req, res) => {
    const userclaim = await Claims.find({ user: req.params.id });
    res.status(200).json({
        status: 'success',
        data: userclaim
    });

}

exports.newClaim = async (req, res) => {

    const newClaim = new Claims(req.body);
    await newClaim.save();
    res.status(201).json({
        status: 'success',
        data: newClaim
    });

}

exports.getAUserClaim = async (req, res) => {
    const userclaim = await Claims.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: userclaim
    });

}

exports.DeletetUserClaims = async (req, res, next) => {
    const claim = await Claims.findById(req.params.id, { active: false });
    if (!claim) return next(new AppError("Claim not Found", 404))
    res.status(204).json({
        status: 'success',
        data: null,
        message: 'User claim has been deactivated'
    });

}
exports.AcceptsClaims = async (req, res, next) => {
    const claim = await Claims.findByIdAndUpdate(req.params.id, { accepted: true, updatedAt: Date.now() });
    if (!claim) {
        return next(new AppError("Claim not found", 404));
    }
    res.status(200).json({
        status: 'success',
        data: claim,
        message: 'Claim has been accepted'


    })
}
exports.RejectClaims = async (req, res, next) => {
    const rejectionreason = req.body.rejectionreason;
    const claim = await Claims.findByIdAndUpdate(req.params.id, { accepted: false, rejectionreason, updatedAt: Date.now() });


    if (!claim) {
        return next(AppError("Claim not found", 404));
    }
    res.status(200).json({
        status: 'success',
        data: claim,
        message: 'Claim has been rejected'
    })
}



