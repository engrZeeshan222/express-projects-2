const  nfts = require("../models/nfts-model")
const {response} = require("../util/apiResponse")
const { StatusCodes } = require("http-status-codes");
const { CustomHttpError } = require("../errors");

exports.createNfts = async(req,res)=>{
    try{
        const {
            body : {
                name,
                description,
                link,
                metadata,
                published,
                thumbnail
            }
        } = req;

        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return response(res,StatusCodes.BAD_REQUEST,false,'Data is not present in request body - send proper data',null)
        }
        let existingNfts = await nfts.findOne({
            where : {
                name : name,
                description : description,
                link : link,
                published : published,
                thumbnail : thumbnail,
                metadata : metadata 
            }
        })
        if(existingNfts){
            return response(res,StatusCodes.CONFLICT,true,"Nfts with this data Already Exists",existingNfts)
        }
        const createdNfts = await nfts.create({
             name : name,
             description : description,
             link : link,
             metadata : metadata,
             published : published,
             thumbnail : thumbnail
        })

        return response(res,StatusCodes.CREATED,true,"Nfts Created Successfully",createdNfts)

    }catch(error){
     return(new CustomHttpError("Nfts Creation Error",StatusCodes.INTERNAL_SERVER_ERROR,error.message) )  
    }
}

exports.getAllNfts=async(req,res)=>{
    try{
        let allNfts = await nfts.findAll({})
        if(!allNfts){
            return response(res,StatusCodes.NOT_FOUND,true,"No Nfts are present in database",null)
        }
        return response(res,StatusCodes.OK,true,"All Nfts",allNfts)
        }catch(error){
            return(new CustomHttpError("Error While fetching Nfts",StatusCodes.INTERNAL_SERVER_ERROR, error.message))    
        }
}

// update-by-id
exports.updateNfts= async(req,res)=>{
    try{
        const {
            params : {
                nftsId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `NftsId required`, null);
        }
        let {
            body : {
                name,
                description,
                link,
                metadata,
                published,
                thumbnail
            }
        } = req;


        let dbNfts = await nfts.findOne({
            where : {id : id}
        })
        if(!dbNfts){
            return response(res,404,false,'No Nfts is founded in against this Id',null)
        }

        //updating data
        dbNfts.name = name ? name : dbNfts.name;
        dbNfts.description = description ? description : dbNfts.description;
        dbNfts.link = link ? link : dbNfts.link;
        dbNfts.published = published ? published : dbNfts.published;
        dbNfts.thumbnail = thumbnail ? thumbnail : dbNfts.thumbnail;
        dbNfts.metadata = metadata ? metadata : dbNfts.metadata;

        //Saving data
        await dbNfts.save();
        return response(res,200,true,"Nfts Updated Successfully",dbNfts)
    }catch(error){
        return(new CustomHttpError("Error While Updating Nfts",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

//delete-by-id
exports.deleteNfts= async(req,res)=>{
    try{
        const {
            params : {
                nftsId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `NftsId required to delete Nfts`, null);
        }
        let nftsForDeletion = await nfts.findOne({
            where : {id : id}
        })

        if(!nftsForDeletion){
            return response(res, 404, false, `No Nfts is founded for deletion against this id`, null);
        }

        nftsForDeletion.destroy();
        return response(res,200,true,'Nfts Deleted !',nftsForDeletion)
    }catch(error){
        return(new CustomHttpError("Error While Deleting Nfts",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
} 