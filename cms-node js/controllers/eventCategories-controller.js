const eventCategories = require("../models/eventCategory-model")
const {response} = require("../util/apiResponse")
const { StatusCodes } = require("http-status-codes");
const { CustomHttpError } = require("../errors");
const events = require("../models/events-model");

exports.createEventsCategories = async(req,res)=>{
    try{
        const {
            body : {
                name ,
                tags,
                description,
                image,
                priority,
                published 
            }
        } = req;

        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return response(res,StatusCodes.BAD_REQUEST,false,'Data is not present in request body - send proper data',null)
        }

        const createdEventCategories = await eventCategories.create({
             name : name,
             description : description,
             published : published,
             tags : tags,
             image : image,
             priority : priority
        })
        
        return response(res,StatusCodes.CREATED,true,"EventsCategories Created Successfully",createdEventCategories)

    }catch(error){
        return (new CustomHttpError("EventsCategories Creation Error",StatusCodes.INTERNAL_SERVER_ERROR,error.message)  ) 

    }
}

exports.getAllEventsCategories=async(req,res)=>{
    try{
        let allEventsCategories = await eventCategories.findAll({})
        if(allEventsCategories == undefined || allEventsCategories ==null){
            return response(res,StatusCodes.NOT_FOUND,true,"No Events are present in database",null)
        }
        return response(res,StatusCodes.OK,true,"All EventsCategories",allEventsCategories)
        }catch(error){
            return( new CustomHttpError("Error While fetching allEventsCategories",StatusCodes.INTERNAL_SERVER_ERROR,error.message)  ) 
        }
}

// update-by-id
exports.updateEventsCategories= async(req,res)=>{
    try{
        const {
            params : {
                categoryId : categoryId
            }
        } = req;
        if(!categoryId){
            return response(res, 400, false, `eventCategoryId required`, null);
        }
        let {
            name ,
            tags,
            description,
            image,
            priority,
            published 
        } = req.body;


        let dbEventCategory = await eventCategories.findOne({
            where : {categoryId}
        })
        if(!dbEventCategory){
            return response(res,404,false,'No EventCategory is founded in DB against this Id',null)
        }


        //updating data
        dbEventCategory.name = name ? name : dbEventCategory.name;
        dbEventCategory.tags = tags  ?tags : dbEventCategory.tags;
        dbEventCategory.description = description ? description : dbEventCategory.description;
        dbEventCategory.image = image ? image : dbEventCategory.image;
        dbEventCategory.priority = priority ? priority : dbEventCategory.priority;
        dbEventCategory.published = published ? published : dbEventCategory.published

        //Saving data
        await dbEventCategory.save();
        return response(res,200,true,"EventCategory Updated Successfully",dbEventCategory)
    }catch(error){
        return (new CustomHttpError("Error While Updating Event",StatusCodes.INTERNAL_SERVER_ERROR,error.message))   
    }
}

//delete-by-id
exports.deleteEventsCategories= async(req,res)=>{
    try{
        const {
            params : {
                categoryId : categoryId
            }
        } = req;
        if(!categoryId){
            return response(res, 400, false, `categoryId required to delete eventCategory`, null);
        }
        let eventCategoryForDeletion = await eventCategories.findOne({
            where : {categoryId : categoryId}
        })

        if(!eventCategoryForDeletion){
            return response(res, 404, false, `No eventCategory is founded for deletion against this id`, null);
        }

        eventCategoryForDeletion.destroy();
        return response(res,200,true,'eventCategory Deleted !',eventCategoryForDeletion)
    }catch(error){
        throw new CustomHttpError("Error While Deleting Events",StatusCodes.INTERNAL_SERVER_ERROR)   
    }
}


exports.getAllEventsByCategoryId = async(req,res)=>{
    try{
        const { params : {
            Id : categoryId
        }} =req;
        let eventsByCategoryId = await eventCategories.findOne({where : {categoryId : categoryId},
        include :[{model : events}]
        })
        if(eventsByCategoryId == undefined || eventsByCategoryId ==null){
            return response(res,StatusCodes.NOT_FOUND,true,"No Events are present in database",null)
        }
        return response(res,StatusCodes.OK,true,"All EventsCategories",eventsByCategoryId)
    }catch(error){
        return(new CustomHttpError("Error while getAllEventsByCategoryId",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

exports.getAllEventsCategoriesWithAllEvents=async(req,res)=>{
    try{
        let alldata = await eventCategories.findAll({
            include :[{model : events}]
        })
        if(alldata == undefined || alldata ==null){
            return response(res,StatusCodes.NOT_FOUND,true,"No Data is present in database",null)
        }
        return response(res,StatusCodes.OK,true,"All EventsCategories with All associated events !",alldata)
        }catch(error){
            return( new CustomHttpError("Error While fetching allEventsCategories with thier associated events",StatusCodes.INTERNAL_SERVER_ERROR,error.message)  ) 
        }
}
