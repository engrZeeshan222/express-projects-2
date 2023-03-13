const contents = require("../models/contents-model")
const {response} = require("../util/apiResponse")
const { StatusCodes } = require("http-status-codes");
const { CustomHttpError } = require("../errors");

exports.createContents = async(req,res)=>{
    try{
        const {
            body : {
                name,
                content,
                link,
                type,
                slug,
                published
            }
        } = req;

        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return response(res,StatusCodes.BAD_REQUEST,false,'Data is not present in request body - send proper data',null)
        }

        const createdContent = await contents.create({
             name : name,
             content : content,
             link : link,
             type : type,
             slug : slug,
             published : published
        })
        
        return response(res,StatusCodes.CREATED,true,"Content Created Successfully",createdContent)

    }catch(error){
     throw new CustomHttpError("Content Creation Error",StatusCodes.INTERNAL_SERVER_ERROR)   
    }
}

exports.getAllContents=async(req,res)=>{
    try{
        let allContents = await contents.findAll({})
        if(!allContents){
            return response(res,StatusCodes.NOT_FOUND,true,"No Contents are present in database",null)
        }
        return response(res,StatusCodes.OK,true,"All Contents",allContents)
        }catch(error){
            throw new CustomHttpError("Error While fetching Contents",StatusCodes.INTERNAL_SERVER_ERROR)   
        }
}

// update-by-id
exports.updateContents= async(req,res)=>{
    try{
        const {
            params : {
                id : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `contentId required`, null);
        }
        let {
            name,
            content,
            link,
            type,
            slug,
            published
        } = req.body;


        let dbContent = await contents.findOne({
            where : {id : id}
        })
        if(!dbContent){
            return response(res,404,false,'No content is founded in against this Id',null)
        }

        //updating data
        dbContent.name = name ? name : dbContent.name;
        dbContent.content = content ? content : dbContent.content;
        dbContent.link = link ? link : dbContent.link;
        dbContent.type = type ? type : dbContent.type;
        dbContent.slug = slug ? slug : dbContent.slug;
        dbContent.published = published ? published : dbContent.published;

        //Saving data
        await dbContent.save();
        return response(res,200,true,"Content Updated Successfully",dbContent)
    }catch(error){
        throw new CustomHttpError("Error While Updating Contents",StatusCodes.INTERNAL_SERVER_ERROR)   
    }
}

//delete-by-id
exports.deleteContents= async(req,res)=>{
    try{
        const {
            params : {
                id : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `contentId required to delete content`, null);
        }
        let contentForDeletion = await contents.findOne({
            where : {id : id}
        })

        if(!contentForDeletion){
            return response(res, 404, false, `No Content is founded for deletion against this id`, null);
        }

        contentForDeletion.destroy();
        return response(res,200,true,'Content Deleted !',contentForDeletion)
    }catch(error){
        throw new CustomHttpError("Error While Deleting Contents",StatusCodes.INTERNAL_SERVER_ERROR)   
    }
}