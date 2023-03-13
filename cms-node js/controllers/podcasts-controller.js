const  podcasts = require("../models/podcasts-model")
const {response} = require("../util/apiResponse")
const { StatusCodes } = require("http-status-codes");
const { CustomHttpError } = require("../errors");

exports.createPodcasts = async(req,res)=>{
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
        let existingPodcasts = await podcasts.findOne({
            where : {
                name : name,
                description : description,
                link : link,
                published : published,
                thumbnail : thumbnail   
            }
        })
        if(existingPodcasts){
            return response(res,StatusCodes.CONFLICT,true,"Podcasts with this data Already Exists",existingPodcasts)
        }
        const createdPodcasts = await podcasts.create({
             name : name,
             description : description,
             link : link,
             published : published,
             thumbnail : thumbnail
        })

        return response(res,StatusCodes.CREATED,true,"Podcasts Created Successfully",createdPodcasts)

    }catch(error){
     return(new CustomHttpError("Podcasts Creation Error",StatusCodes.INTERNAL_SERVER_ERROR,error.message) )  
    }
}

exports.getAllPodcasts=async(req,res)=>{
    try{
        let allPodcasts = await podcasts.findAll({})
        if(!allPodcasts){
            return response(res,StatusCodes.NOT_FOUND,true,"No Podcasts are present in database",null)
        }
        return response(res,StatusCodes.OK,true,"All Podcasts",allPodcasts)
        }catch(error){
            return(new CustomHttpError("Error While fetching Podcasts",StatusCodes.INTERNAL_SERVER_ERROR, error.message))    
        }
}

// update-by-id
exports.updatePodcasts= async(req,res)=>{
    try{
        const {
            params : {
                podcastsId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `PodcastsId required`, null);
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


        let dbPodcasts = await podcasts.findOne({
            where : {id : id}
        })
        if(!dbPodcasts){
            return response(res,404,false,'No Podcasts is founded in against this Id',null)
        }

        //updating data
        dbPodcasts.name = name ? name : dbPodcasts.name;
        dbPodcasts.description = description ? description : dbPodcasts.description;
        dbPodcasts.link = link ? link : dbPodcasts.link;
        dbPodcasts.published = published ? published : dbPodcasts.published;
        dbPodcasts.thumbnail = thumbnail ? thumbnail : dbPodcasts.thumbnail;

        //Saving data
        await dbPodcasts.save();
        return response(res,200,true,"Podcasts Updated Successfully",dbPodcasts)
    }catch(error){
        return(new CustomHttpError("Error While Updating Podcasts",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

//delete-by-id
exports.deletePodcasts= async(req,res)=>{
    try{
        const {
            params : {
                podcastsId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `PodcastsId required to delete Podcasts`, null);
        }
        let podcastsForDeletion = await podcasts.findOne({
            where : {id : id}
        })

        if(!podcastsForDeletion){
            return response(res, 404, false, `No Podcasts is founded for deletion against this id`, null);
        }

        podcastsForDeletion.destroy();
        return response(res,200,true,'Podcasts Deleted !',podcastsForDeletion)
    }catch(error){
        return(new CustomHttpError("Error While Deleting Podcasts",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
} 