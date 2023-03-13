const  tiktok = require("../models/tiktok-model")
const {response} = require("../util/apiResponse")
const { StatusCodes } = require("http-status-codes");
const { CustomHttpError } = require("../errors");

exports.createTiktok = async(req,res)=>{
    try{
        const {
            body : {
                name,
                description,
                link,
                published,
                thumbnail
            }
        } = req;

        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return response(res,StatusCodes.BAD_REQUEST,false,'Data is not present in request body - send proper data',null)
        }
        let existingTiktok = await tiktok.findOne({
            where : {
                name : name,
                description : description,
                link : link,
                published : published,
                thumbnail : thumbnail   
            }
        })
        if(existingTiktok){
            return response(res,StatusCodes.CONFLICT,true,"Tiktok with this data Already Exists",existingTiktok)
        }
        const createdTiktok = await tiktok.create({
             name : name,
             description : description,
             link : link,
             published : published,
             thumbnail : thumbnail
        })

        return response(res,StatusCodes.CREATED,true,"Tiktok Created Successfully",createdTiktok)

    }catch(error){
     return(new CustomHttpError("Tiktok Creation Error",StatusCodes.INTERNAL_SERVER_ERROR,error.message) )  
    }
}

exports.getAllTiktok=async(req,res)=>{
    try{
        let allTiktok = await tiktok.findAll({})
        if(!allTiktok){
            return response(res,StatusCodes.NOT_FOUND,true,"No Tiktok are present in database",null)
        }
        return response(res,StatusCodes.OK,true,"All Tiktok",allTiktok)
        }catch(error){
            return(new CustomHttpError("Error While fetching Tiktok",StatusCodes.INTERNAL_SERVER_ERROR, error.message))    
        }
}

// update-by-id
exports.updateTiktok= async(req,res)=>{
    try{
        const {
            params : {
                tiktokId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `TiktokId required`, null);
        }
        let {
            body : {
                name,
                description,
                link,
                published,
                thumbnail
            }
        } = req;


        let dbTiktok = await tiktok.findOne({
            where : {id : id}
        })
        if(!dbTiktok){
            return response(res,404,false,'No Tiktok is founded in against this Id',null)
        }

        //updating data
        dbTiktok.name = name ? name : dbTiktok.name;
        dbTiktok.description = description ? description : dbTiktok.description;
        dbTiktok.link = link ? link : dbTiktok.link;
        dbTiktok.published = published ? published : dbTiktok.published;
        dbTiktok.thumbnail = thumbnail ? thumbnail : dbTiktok.thumbnail;

        //Saving data
        await dbTiktok.save();
        return response(res,200,true,"Tiktok Updated Successfully",dbTiktok)
    }catch(error){
        return(new CustomHttpError("Error While Updating Tiktok",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

//delete-by-id
exports.deleteTiktok= async(req,res)=>{
    try{
        const {
            params : {
                tiktokId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `TiktokId required to delete Tiktok`, null);
        }
        let tiktokForDeletion = await tiktok.findOne({
            where : {id : id}
        })

        if(!tiktokForDeletion){
            return response(res, 404, false, `No Tiktok is founded for deletion against this id`, null);
        }

        tiktokForDeletion.destroy();
        return response(res,200,true,'Tiktok Deleted !',tiktokForDeletion)
    }catch(error){
        return(new CustomHttpError("Error While Deleting Tiktok",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
} 