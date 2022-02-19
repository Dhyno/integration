const { transaction,productOrder, toppingOrder,user,product,topping }=require('../../models/index');

exports.addTransaction = async (req,res) => {
    try{

        idUser=req.body.user;//get id user from json
        let product=req.body.product;
        console.log(idUser)

        let getIdTransaction=await transaction.create({
            idCustomer: idUser,
            transactionStatus: "tentative"//tentative when order, on the way or else is transaction
        });
        // console.log(getIdTransaction.id);
        product.forEach( async (dataProduct,indeks)=>{
            let getIdProductOrder=await productOrder.create({
                idTransaction: getIdTransaction.id,
                idProduct: dataProduct.id,
                qty: dataProduct.qty
            })
            dataProduct.topping.forEach( async (data,indeks)=>{
                let getToppingrder= await toppingOrder.create({
                    idProductOrder: getIdProductOrder.id,
                    toppingId: data
                })
            })
        })

        res.status(200).send({
            status: "success"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Server Error",
        });
    }
}

exports.getTransaction= async ( req, res) => {
    try{

        let result= await transaction.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt','password']
            },
            include:[
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ['createdAt','updatedAt','password']
                    }
                },
                {
                    model: productOrder,
                    as: "productOrder",
                    attributes: {
                        exclude: ['createdAt','updatedAt',"idProduct","idTransaction","id"]
                    },
                    include: [
                        {
                            model: product,
                            as: "product",
                            attributes: {
                                exclude: ['createdAt','updatedAt']
                            },
                        },
                        {
                            model: toppingOrder,
                            as: "toppingOrder",
                            attributes: {
                                exclude: ['createdAt','updatedAt',"idProductOrder","id"]
                            },
                            include:[
                                {
                                    model: topping,
                                    as: "topping",
                                    attributes: {
                                        exclude: ['createdAt','updatedAt',"idProductOrder","id"]
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]
        })

        //filter cause to send to front end that make easily get in client thpugh in backend is like not clean cde
        
        result=result.map((data)=>{
            return{
                id: data.id,
                userOrder:{
                    id: data.user.id,
                    fullName: data.user.name,
                    email: data.user.email
                },
                status: data.transactionStatus,
                order: data.productOrder.map((data)=>{
                    return{
                        id: data.product.id,
                        title: data.product.name,
                        price: data.product.price,
                        image: process.env.FILE_PATH+data.product.image,
                        toppings: data.toppingOrder.map((data)=>{
                            return{
                                id: data.toppingId,
                                name: data.topping.name,
                                image: process.env.FILE_PATH+data.topping.image
                            }                
                        })
                    }
                })
            }
        })

        res.status(200).send({
            message: "success",
            result
        })

    } catch(err){
        console.log(err);
        res.send({
            error: err
        })
    }
}

exports.getDetailTransaction= async (req, res) => {
    try{

        let result= await transaction.findOne({
            where:{
                id: req.params.idtrans
            },
            include:[
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ['createdAt','updatedAt','password']
                    }
                },
                {
                    model: productOrder,
                    as: "productOrder",
                    attributes: {
                        exclude: ['createdAt','updatedAt',"idProduct","idTransaction","id"]
                    },
                    include: [
                        {
                            model: product,
                            as: "product",
                            attributes: {
                                exclude: ['createdAt','updatedAt']
                            },
                        },
                        {
                            model: toppingOrder,
                            as: "toppingOrder",
                            attributes: {
                                exclude: ['createdAt','updatedAt',"idProductOrder","id"]
                            },
                            include:[
                                {
                                    model: topping,
                                    as: "topping",
                                    attributes: {
                                        exclude: ['createdAt','updatedAt',"idProductOrder","id"]
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]
        })

        let resultToSend={
            id: result.id,
            userOrder:{
                id: result.user.id,
                fullName: result.user.name,
                email: result.user.email
            },
            status: result.transactionStatus,
            order:result.productOrder.map((data)=>{
                return{
                    id: data.product.id,
                    title: data.product.name,
                    price: data.product.price,
                    image: data.product.image,
                    toppings: data.toppingOrder.map((data)=>{
                        return{
                            id: data.toppingId,
                            name: data.topping.name,
                            image: process.env.FILE_PATH+data.topping.image
                        }                
                    })
                }
            })
        }

        res.status(200).send({
            message: "succes",
            resultToSend
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Server Error",
        });
    }
}

exports.deleteTransaction= async (req, res) => {
    try{

        await transaction.destroy({
            where:{
                id: req.params.id
            }
        })

        res.status(200).send({
            status: "success",
            id: req.params.id
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Server Error",
        });
    }
}

exports.myTransaction= async (req, res) => {
    try{

        let result=await transaction.findAll({
            where:{
                idCustomer: req.params.id
            },
            include:[
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ['createdAt','updatedAt','password']
                    }
                },
                {
                    model: productOrder,
                    as: "productOrder",
                    attributes: {
                        exclude: ['createdAt','updatedAt',"idProduct","idTransaction","id"]
                    },
                    include: [
                        {
                            model: product,
                            as: "product",
                            attributes: {
                                exclude: ['createdAt','updatedAt']
                            },
                        },
                        {
                            model: toppingOrder,
                            as: "toppingOrder",
                            attributes: {
                                exclude: ['createdAt','updatedAt',"idProductOrder","id"]
                            },
                            include:[
                                {
                                    model: topping,
                                    as: "topping",
                                    attributes: {
                                        exclude: ['createdAt','updatedAt',"idProductOrder","id"]
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]
        })

        result=result.map((data)=>{
            return{
                id: data.id,
                userOrder:{
                    id: data.user.id,
                    fullName: data.user.name,
                    email: data.user.email
                },
                status: data.transactionStatus,
                order: data.productOrder.map((data)=>{
                    return{
                        id: data.product.id,
                        title: data.product.name,
                        price: data.product.price,
                        image: process.env.FILE_PATH+data.product.image,
                        toppings: data.toppingOrder.map((data)=>{
                            return{
                                id: data.toppingId,
                                name: data.topping.name,
                                image: process.env.FILE_PATH+data.topping.image
                            }                
                        })
                    }
                })
            }
        })

        res.status(200).send({
            message: "success",
            result
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Server Error",
        });
    }
}

exports.editsTransaction= async (req, res) => {
    try{

        await transaction.update(
            { transactionStatus: req.body.status  },
            {
                where: {
                    id: req.params.id
                }
            }
        )

        let result= await transaction.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ['createdAt','updatedAt','password']
                    }
                },
                {
                    model: productOrder,
                    as: "productOrder",
                    attributes: {
                        exclude: ['createdAt','updatedAt',"idProduct","idTransaction","id"]
                    },
                    include: [
                        {
                            model: product,
                            as: "product",
                            attributes: {
                                exclude: ['createdAt','updatedAt']
                            },
                        },
                        {
                            model: toppingOrder,
                            as: "toppingOrder",
                            attributes: {
                                exclude: ['createdAt','updatedAt',"idProductOrder","id"]
                            },
                            include:[
                                {
                                    model: topping,
                                    as: "topping",
                                    attributes: {
                                        exclude: ['createdAt','updatedAt',"idProductOrder","id"]
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]
        })

        let resultToSend={
            id: result.id,
            userOrder:{
                id: result.user.id,
                fullName: result.user.name,
                email: result.user.email
            },
            status: result.transactionStatus,
            order:result.productOrder.map((data)=>{
                return{
                    id: data.product.id,
                    title: data.product.name,
                    price: data.product.price,
                    image: process.env.FILE_PATH+data.product.image,
                    toppings: data.toppingOrder.map((data)=>{
                        return{
                            id: data.toppingId,
                            name: data.topping.name,
                            image: process.env.FILE_PATH+data.topping.image
                        }                
                    })
                }
            })
        }

        res.status(200).send({
            status: "suucces",
            resultToSend
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Server Error",
        });
    }  
}