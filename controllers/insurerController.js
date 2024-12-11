const Insurer = require('./../model/Insurer');
const Plan = require('./../model/Plans');
const AppError = require('./../utils/appError');

//For frontEnd
exports.getInsurer = async (req, res, next) => {
    console.log('ok');
    const insurer = await Insurer.find()
    console.log(insurer);

    res.status(200).json({
        status: 'success',
        data: insurer

    });
}

exports.getAnInsurer = async (req, res, next) => {
    const insurer = await Insurer.findById(req.params.id);
    if (!insurer) return next(new AppError("Insurer not Found", 404));

    res.status(201).json({
        status: 'success',
        data: insurer


    })

}


exports.getPlan = async (req, res) => {
    const plan = Plan.find();
    res.status(200).json({
        status: "Success",
        Plan
    })
}
exports.creatPlan = async (req, res) => {
    const plan = new Plan(req.body);
    res.status(201).json({
        status: "Success",
        plan
    })

}
