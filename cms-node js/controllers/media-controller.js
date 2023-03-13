const  media = require("../models/media-model")
const {response} = require("../util/apiResponse")
const { StatusCodes } = require("http-status-codes");
const { CustomHttpError } = require("../errors");

exports.createMedia = async(req,res)=>{
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
        let existingMedia = await media.findOne({
            where : {
                name : name,
                description : description,
                link : link,
                published : published,
                thumbnail : thumbnail   
            }
        })
        if(existingMedia){
            return response(res,StatusCodes.CONFLICT,true,"Media with this data Already Exists",existingMedia)
        }
        const createdMedia = await media.create({
             name : name,
             description : description,
             link : link,
             published : published,
             thumbnail : thumbnail
        })

        return response(res,StatusCodes.CREATED,true,"Media Created Successfully",createdMedia)

    }catch(error){
     return(new CustomHttpError("Media Creation Error",StatusCodes.INTERNAL_SERVER_ERROR,error.message) )  
    }
}

exports.getAllMedia=async(req,res)=>{
    try{
        let allMedia = await media.findAll({})
        if(!allMedia){
            return response(res,StatusCodes.NOT_FOUND,true,"No Media are present in database",null)
        }
        return response(res,StatusCodes.OK,true,"All Media",allMedia)
        }catch(error){
            return(new CustomHttpError("Error While fetching Media",StatusCodes.INTERNAL_SERVER_ERROR, error.message))    
        }
}

// update-by-id
exports.updateMedia= async(req,res)=>{
    try{
        const {
            params : {
                mediaId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `MediaId required`, null);
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


        let dbMedia = await media.findOne({
            where : {id : id}
        })
        if(!dbMedia){
            return response(res,404,false,'No Media is founded in against this Id',null)
        }

        //updating data
        dbMedia.name = name ? name : dbMedia.name;
        dbMedia.description = description ? description : dbMedia.description;
        dbMedia.link = link ? link : dbMedia.link;
        dbMedia.published = published ? published : dbMedia.published;
        dbMedia.thumbnail = thumbnail ? thumbnail : dbMedia.thumbnail;

        //Saving data
        await dbMedia.save();
        return response(res,200,true,"Media Updated Successfully",dbMedia)
    }catch(error){
        return(new CustomHttpError("Error While Updating Media",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

//delete-by-id
exports.deleteMedia= async(req,res)=>{
    try{
        const {
            params : {
                mediaId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `MediaId required to delete Media`, null);
        }
        let mediaForDeletion = await media.findOne({
            where : {id : id}
        })

        if(!mediaForDeletion){
            return response(res, 404, false, `No media is founded for deletion against this id`, null);
        }

        mediaForDeletion.destroy();
        return response(res,200,true,'Media Deleted !',mediaForDeletion)
    }catch(error){
        return(new CustomHttpError("Error While Deleting Media",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
} 