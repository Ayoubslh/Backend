const  Insurer = require('./../model/Insurer');
const AppError=require('./../utils/appError');

//For frontEnd
exports.getInsurer=async (req,res,next)=>{
    const insurer=Insurer.find()

    res.status(200).json({
        status:'success',
        data:insurer

    });
}

exports.getAnInsurer=async (req,res,next)=>{
    const insurer= Insurer.findById(req.params.id);
    if(!insurer) return next(new AppError("Insurer not Found",404)); 

  res.status(201).json({
    status:'success',
        data:insurer


  })

}


exports.creatInsurer= async(req,res,next)=>{
    const insurer= new Insurer(req.body)

}