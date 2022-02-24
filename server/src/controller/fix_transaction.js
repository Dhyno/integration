
const { fix_transaction,transaction,user,productOrder, toppingOrder,product,topping  } = require("../../models");

exports.getFixTransactions= async (req, res) => {
    try{

        let result= await fix_transaction.findAll({
            attributes:{
                exclude: ['createdAt','updatedAt']
            },
            include:[
                {
                    model: transaction,
                    as: "transaction",
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    },
                    include:[
                        {
                            model: productOrder,
                            as: "productOrder",
                            attributes: {
                                exclude: ['createdAt','updatedAt',"idProduct","idTransaction"]
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
                }
            ]
        });

        resultToSend=result.map( data => {
            return{
                idTransaction: data.idTransaction,
                idUser: data.idUser,
                status: data.status,
                income: data.income,
                name: data.name,
                email: data.email,
                phone: data.phone,
                postCode: data.postCode,
                address: data.address, 
                attachment: process.env.FILE_PATH +data.attachment,
                order: data.transaction.productOrder.map( data =>{
                return{
                    id: data.id,
                    idProduct: data.product.id,
                    title: data.product.name,
                    price: data.product.price,
                    image: process.env.FILE_PATH+data.product.image,
                    qty: data.qty,
                    toppings: data.toppingOrder.map((data)=>{
                        return{
                            idTopping: data.toppingId,
                            name: data.topping.name,
                            image: process.env.FILE_PATH+data.topping.image
                        }                
                    })
                }
            })
            }
            
        })

        res.send({
            status: "success",
            resultToSend
        })


    } catch(error){
        console.log(error);
        res.send({
            status: "failed",
        })
    }
}


exports.getDetailFixTransactions= async (req, res) => {
    try{
        // console.log(req.user);

        let result= await fix_transaction.findAll({
            where: {
                idUser: req.user.id
            },
            include:[
                {
                    model: transaction,
                    as: "transaction",
                    attributes:{
                        exclude: ['createdAt','updatedAt']
                    },
                    include:[
                        {
                            model: productOrder,
                            as: "productOrder",
                            attributes: {
                                exclude: ['createdAt','updatedAt',"idProduct","idTransaction"]
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
                }
            ]
        });

        resultToSend=result.map( data => {
            return{
                idTransaction: data.idTransaction,
                idUser: data.idUser,
                status: data.status,
                income: data.income,
                name: data.name,
                email: data.email,
                phone: data.phone,
                postCode: data.postCode,
                address: data.address, 
                attachment: process.env.FILE_PATH +data.attachment,
                orderAt:data.createdAt,
                order: data.transaction.productOrder.map( data =>{
                return{
                    id: data.id,
                    idProduct: data.product.id,
                    title: data.product.name,
                    price: data.product.price,
                    image: process.env.FILE_PATH+data.product.image,
                    qty: data.qty,
                    toppings: data.toppingOrder.map((data)=>{
                        return{
                            idTopping: data.toppingId,
                            name: data.topping.name,
                            image: process.env.FILE_PATH+data.topping.image
                        }                
                    })
                }
            })
            }
            
        })

        res.send({
            status: "success",
            resultToSend
        })


    } catch(error){
        console.log(error);
        res.send({
            status: "failed",
        })
    }
}



exports.addFixTransactions= async (req, res) => {
    try{

        // console.log(req.user.id);
        // console.log(req.file)

        // console.log(req.body);

        // let data=req.body;
        let data=req.body;

        let result = await fix_transaction.create({
            ...data,
             idUser: req.user.id,
            attachment: req.file.filename,
        })

        await transaction.update(
            { transactionStatus: req.body.status  },
            {
                where: {
                    id: req.body.idTransaction
                }
            }
        )

        result = JSON.parse(JSON.stringify(result))

        result = {
            ...result,
            attachment: process.env.FILE_PATH + result.attachment
        }

        res.send({
            status: "success",
            result
        })


    } catch(error){
        console.log(error);
        res.send({
            status: "failed",
        })
    }
}

exports.changeFixTransaction = async (req, res) => {
    try{
  
        await fix_transaction.update(
            { status: req.body.status  },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        const idTransactions=await fix_transaction.findOne({
            where: {
                id: req.params.id
            }
        })

        await transaction.update(
            { transactionStatus: req.body.status  },
            {
                where: {
                    id: idTransactions.idTransaction
                }
            }
        )

        res.send({
            status: "success",
        })

    } catch(error){
        console.log(error);
        res.send({
            status: "failed",
        })
    }
}

