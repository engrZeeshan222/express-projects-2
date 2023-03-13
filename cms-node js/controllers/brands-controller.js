const  brands = require("../models/brands-model")
const {response} = require("../util/apiResponse")
const { StatusCodes } = require("http-status-codes");
const { CustomHttpError } = require("../errors");

exports.createBrands = async(req,res)=>{
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
        let existingBrand = await brands.findOne({
            where : {
                name : name,
                description : description,
                link : link,
                published : published,
                thumbnail : thumbnail   
            }
        })
        if(existingBrand){
            return response(res,StatusCodes.CONFLICT,true,"Brand with this data Already Exists",existingBrand)
        }
        const createdBrand = await brands.create({
             name : name,
             description : description,
             link : link,
             published : published,
             thumbnail : thumbnail
        })

        return response(res,StatusCodes.CREATED,true,"Brand Created Successfully",createdBrand)

    }catch(error){
     return(new CustomHttpError("Brands Creation Error",StatusCodes.INTERNAL_SERVER_ERROR,error.message) )  
    }
}

exports.getAllBrands=async(req,res)=>{
    try{
        let allBrands = await brands.findAll({})
        if(!allBrands){
            return response(res,StatusCodes.NOT_FOUND,true,"No Brands are present in database",null)
        }
        return response(res,StatusCodes.OK,true,"All Brands",allBrands)
        }catch(error){
            return(new CustomHttpError("Error While fetching Brands",StatusCodes.INTERNAL_SERVER_ERROR, error.message))    
        }
}

// update-by-id
exports.updateBrands= async(req,res)=>{
    try{
        const {
            params : {
                brandId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `brandId required`, null);
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


        let dbBrand = await brands.findOne({
            where : {id : id}
        })
        if(!dbBrand){
            return response(res,404,false,'No Brand is founded in against this Id',null)
        }

        //updating data
        dbBrand.name = name ? name : dbBrand.name;
        dbBrand.description = description ? description : dbBrand.description;
        dbBrand.link = link ? link : dbBrand.link;
        dbBrand.published = published ? published : dbBrand.published;
        dbBrand.thumbnail = thumbnail ? thumbnail : dbBrand.thumbnail;

        //Saving data
        await dbBrand.save();
        return response(res,200,true,"Brand Updated Successfully",dbBrand)
    }catch(error){
        return(new CustomHttpError("Error While Updating Brands",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
}

//delete-by-id
exports.deleteBrands= async(req,res)=>{
    try{
        const {
            params : {
                brandId : id
            }
        } = req;
        if(!id){
            return response(res, 400, false, `brandId required to delete brand`, null);
        }
        let brandForDeletion = await brands.findOne({
            where : {id : id}
        })

        if(!brandForDeletion){
            return response(res, 404, false, `No brand is founded for deletion against this id`, null);
        }

        brandForDeletion.destroy();
        return response(res,200,true,'Brand Deleted !',brandForDeletion)
    }catch(error){
        return(new CustomHttpError("Error While Deleting Brands",StatusCodes.INTERNAL_SERVER_ERROR, error.message))
    }
} 