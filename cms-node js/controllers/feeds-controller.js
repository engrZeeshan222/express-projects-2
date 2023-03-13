const  feeds = require("../models/feeds-model")
const {response} = require("../util/apiResponse")
const { StatusCodes } = require("http-status-codes");
const { CustomHttpError } = require("../errors");

exports.createFeeds = async(req,res)=>{
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
        let existingFeed = await feeds.findOne({
            where : {
                name : name,
                description : description,
                link : link,
                published : published,
                thumbnail : thumbnail   
            }
        })
        if(existingFeed){
            return response(res,StatusCodes.CONFLICT,true,"Feed with this data Already Exists",existingFeed)
        }
        const createdFeed = await feeds.create({
             name : name,
             description : description,
             link : link,
             published : published,
             thumbnail : thumbnail
        })

        return response(res,StatusCodes.CREATED,true,"Feed Created Successfully",createdFeed)

    }catch(error){
     return(new CustomHttpError("Feed Creation Error",StatusCodes.INTERNAL_SERVER_ERROR,error.message) )  
    }
}

exports.getAllFeeds=async(req,res)=>{
    try{
        let allFeeds = await feeds.findAll({})
        if(!allFeeds){
            return response(res,StatusCodes.NOT_FOUND,true,"No Feeds are present in database",null)
        }
        return response(res,StatusCodes.OK,true,"All Feeds",allFeeds)
        }catch(error){
            return(new CustomHttpError("Error While fetching Feeds",StatusCodes.INTERNAL_SERVER_ERROR, error.message))    
        }
}

// update-by-id
exports.updateFeeds= async(req,res)=>{
    try{
        const {
            params : {
                feedId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `FeedId required`, null);
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


        let dbFeed = await feeds.findOne({
            where : {id : id}
        })
        if(!dbFeed){
            return response(res,404,false,'No feed is founded in against this Id',null)
        }

        //updating data
        dbFeed.name = name ? name : dbFeed.name;
        dbFeed.description = description ? description : dbFeed.description;
        dbFeed.link = link ? link : dbFeed.link;
        dbFeed.published = published ? published : dbFeed.published;
        dbFeed.thumbnail = thumbnail ? thumbnail : dbFeed.thumbnail;

        //Saving data
        await dbFeed.save();
        return response(res,200,true,"Feed Updated Successfully",dbFeed)
    }catch(error){
        return(new CustomHttpError("Error While Updating Feeds",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

//delete-by-id
exports.deleteFeeds= async(req,res)=>{
    try{
        const {
            params : {
                feedId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `feedId required to delete feed`, null);
        }
        let feedForDeletion = await feeds.findOne({
            where : {id : id}
        })

        if(!feedForDeletion){
            return response(res, 404, false, `No feed is founded for deletion against this id`, null);
        }

        feedForDeletion.destroy();
        return response(res,200,true,'Feed Deleted !',feedForDeletion)
    }catch(error){
        return(new CustomHttpError("Error While Deleting Feeds",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
} 