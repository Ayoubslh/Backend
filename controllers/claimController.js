const Claims=require('./../model/Claim');
const AppError=require('./../utils/appError');



exports.getAllClaims= async(req,res)=>{
    const claims= await Claims.find();
    res.status(200).json({
        status:'success',
        data:{claims }
        });


}

exports.getUserClaims= async(req,res)=>{
    const userclaim= await Claims.find({user:req.params.phone});
    res.status(200).json({
        status:'success',
        data:userclaim 
        });

}

exports.newClaim= async(req,res)=>{
    const newClaim= await new Claims(req.body);
    await newClaim.save();
    res.status(201).json({
        status:'success',
        data:newClaim
        });
}

exports.getUserClaims= async(req,res)=>{
    const userclaim= await Claims.findById(req.params.id);
    res.status(200).json({
        status:'success',
        data:userclaim 
        });

}

exports.DeletetUserClaims= async(req,res)=>{
    const Deactivateuserclaim= await Claims.findById(req.params.id).select();
    res.status(204).json({
        status:'success',
        data:null
        });

}

