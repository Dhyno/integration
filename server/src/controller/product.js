const { product } = require("../../models");
const fs=require('fs');
const path=require('path');

exports.addProduct= async (req, res) => {
    try{
        const data =req.body;

        let result = await product.create({
            ...data,
            image: req.file.filename,
        })

        result = JSON.parse(JSON.stringify(result))

        result = {
            ...result,
            image: process.env.FILE_PATH + result.image
        }
        
        res.status(200).send({
            status: "success",
            data: result
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Server Error",
        });
    }
}

exports.changeProduct = async (req, res) => {
    try{
        const data =req.body;
        //for delete image before change to new one
        let{ image } = await product.findOne({
            where: {
                id: req.params.id
            }
        })

        image=path.join(__dirname,'../../uploads',image)
        fs.unlink(image,(err)=>{
            console.log(err);
        });

        await product.update(
            {...data,
                image: req.file.filename
            },
            {
            where: {
                id: req.params.id
            }
        })
        let result= await product.findOne({
            where: {
                id: req.params.id
            },attributes: {
                exclude: ['createdAt','updatedAt']
            }
        })
        result = JSON.parse(JSON.stringify(result))
        result = {
            ...result,
            image: process.env.FILE_PATH + result.image
        }

        res.status(200).send({
            status: "succes",
            data: {
                product: result
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Server Error",
        });
    }
}

exports.delProduct = async (req, res) => {
    try{

        let { image }= await product.findOne({
            where: {
                id:req.params.id
            }
        })

        image=path.join(__dirname,'../../uploads',image)
        fs.unlink(image,(err)=>{
            if(err){
                return res.send({
                    message: "failed",
                    status: "300"
                })
            }
        });
        const result= await product.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({
            status: "success",
            data: {
                id: req.params.id
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Server Error",
        });
    }
}

exports.getDetailProduct = async (req, res) => {
    try{

        let result = await product.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        })
        result=JSON.parse(JSON.stringify(result))//to overwrite image in data
        result.image=process.env.FILE_PATH+result.image

        res.status(200).send({
            status: "success",
            data: {
                product: result
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Server Error",
        });
    }
}

exports.getProducts = async (req, res) => {
    try{

        let result = await product.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        });

        result=JSON.parse(JSON.stringify(result))//to overwrite image in data

        // console.log(result[0].image);

        result.map( data =>data.image=process.env.FILE_PATH+data.image);

        res.status(200).send({
            status: "success",
            data: {
                products: result
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Server Error",
        });
    }
}