const events = require("../models/events-model")
const {response} = require("../util/apiResponse")
const { StatusCodes } = require("http-status-codes");
const { CustomHttpError } = require("../errors");

exports.createEvents = async(req,res)=>{
    try{
        const {
            body : {
                name,
                description,
                link,
                published,
                thumbnail,
                timings,
                address,
                zipcode,
                categoryId,
                metadata,
                price_usd,
                price_eth,
                reward_token,
                security_token	
            }
        } = req;

        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return response(res,StatusCodes.BAD_REQUEST,false,'Data is not present in request body - send proper data',null)
        }

        const createdEvent = await events.create({
             name : name,
             description : description,
             thumbnail : thumbnail,
             timings : timings,
             address : address ,
             zipcode : zipcode,
             categoryId : categoryId,
             metadata : metadata,
             price_usd : price_usd,
             price_eth : price_eth,
             reward_token : reward_token,
             security_token : security_token,
             link : link,
             published : published
        })
        
        return response(res,StatusCodes.CREATED,true,"Events Created Successfully",createdEvent)

    }catch(error){
     return(new CustomHttpError("Events Creation Error",StatusCodes.INTERNAL_SERVER_ERROR,error.message))    
    }
}

exports.getAllEvents=async(req,res)=>{
    try{
        let allEvents = await events.findAll({})
        if(allEvents == undefined || allEvents ==null){
            return response(res,StatusCodes.NOT_FOUND,true,"No Events are present in database",null)
        }
        return response(res,StatusCodes.OK,true,"All allEvents",allEvents)
        }catch(error){
            throw new CustomHttpError("Error While fetching Events",StatusCodes.INTERNAL_SERVER_ERROR)   
        }
}

// update-by-id
exports.updateEvents= async(req,res)=>{
    try{
        const {
            params : {
                id : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `eventId required`, null);
        }
        let {
            name,
            description,
            link,
            published,
            thumbnail,
            timings,
            address,
            zipcode,
            categoryId,
            metadata,
            price_usd,
            price_eth,
            reward_token,
            security_token	
        } = req.body;


        let dbEvent = await events.findOne({
            where : {id : id}
        })
        if(!dbEvent){
            return response(res,404,false,'No event is founded in against this Id',null)
        }

        //updating data

        dbEvent.name = name ? name : dbEvent.name;
        dbEvent.link = link ? link : dbEvent.link;
        dbEvent.description = description ? description : dbEvent.description;
        dbEvent.thumbnail = thumbnail ? thumbnail : dbEvent.thumbnail;
        dbEvent.timings = timings ? timings : dbEvent.timings;
        dbEvent.address = address ? address : dbEvent.address;
        dbEvent.zipcode = zipcode ? zipcode : dbEvent.zipcode;
        dbEvent.categoryId = categoryId ? categoryId : dbEvent.categoryId;
        dbEvent.metadata = metadata ? metadata : dbEvent.metadata;
        dbEvent.price_usd = price_usd ? price_usd : dbEvent.price_usd;
        dbEvent.price_eth = price_eth ? price_eth : dbEvent.price_eth;
        dbEvent.reward_token = reward_token ? reward_token : dbEvent.reward_token;
        dbEvent.security_token = security_token ? security_token : dbEvent.security_token;
        dbEvent.published = published ? published : dbEvent.published;

        //Saving data
        await dbEvent.save();
        return response(res,200,true,"Event Updated Successfully",dbEvent)
    }catch(error){
        throw new CustomHttpError("Error While Updating Event",StatusCodes.INTERNAL_SERVER_ERROR)   
    }
}

//delete-by-id
exports.deleteEvents= async(req,res)=>{
    try{
        const {
            params : {
                id : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `Event-Id required to delete event`, null);
        }
        let eventForDeletion = await events.findOne({
            where : {id : id}
        })

        if(!eventForDeletion){
            return response(res, 404, false, `No Event is founded for deletion against this id`, null);
        }

        eventForDeletion.destroy();
        return response(res,200,true,'Event Deleted !',eventForDeletion)
    }catch(error){
        throw new CustomHttpError("Error While Deleting Events",StatusCodes.INTERNAL_SERVER_ERROR)   
    }
}