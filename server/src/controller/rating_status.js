const { ratestatus, user, fix_transaction }=require('../../models/index');
const { Op }=require('sequelize');

exports.getRateStatus = async ( req, res ) => {
    try{
        let result = await ratestatus.findAll({
            attributes: ['createdAt','Commentuser','id'],
            where: {
                Commentuser:{
                    [Op.not]: null,
                    [Op.not]: ''
                },
            },
            include:[
                {
                    model: user,
                    required: true,
                    as: "customer",
                    attributes: ['image','id']
                },
                {
                    model: fix_transaction,
                    as: "fix_transaction",
                    attributes: ['name']
                }
            ]
        });

        result=result.map( data =>{
            return{
                id: data.id,
                createdAt: data.createdAt,
                Commentuser: data.Commentuser,
                name: data.fix_transaction.name,
                customer:{
                    id: data.customer.id,
                    image: process.env.FILE_PATH+data.customer.image
                }
            }
        })

        res.status(200).send({
            message: "success",
            result
        })
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "server error",
            error
        })
    }
}

exports.getDetailRateStatus = async ( req, res ) => {
    try{

        let result = await ratestatus.findOne({
            attributes: {
                exclude: ['createdAt','updatedAt']
            },
            where: {
                idfix_transaction: req.params.id
            }
        })

        res.status(200).send({
            message: "success",
            result
        })

    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "server error",
            error
        })
    }
}

exports.employeeComment = async (req, res ) => {
    try{

        let result = ratestatus.update(
            { employeeComment: req.body.message },
            {
                where: {
                    idfix_transaction: req.params.id
                }
            }
        )

        res.status(200).send({
            message: "success",
            result
        })

    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "server error",
            error
        })
    }
}

exports.customerComment = async ( req, res) => {
    try{

        let result = await ratestatus.update(
            {
                Commentuser: req.body.message,
                rating: req.body.rating
            },
            {
                where: {
                    idfix_transaction: req.params.id
                }
            }    
        )
        res.status(200).send({
            message: "success",
            result
        })

    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "server error",
            error
        })
    }
}

exports.addRateStatus = async ( req, res ) => {
    try{
        //give deault message " OK " froma dmin if admin dont fill input message
        let result = ratestatus.create(req.body);//not include for user comment and rating this from admin
         res.status(200).send({
             message: "success",
             result
         })

    } catch(error){
        console.log(error);
        res.status(500).send({
            message: "server error",
            error
        })
    }
}

exports.getStatusByCondition = async ( req, res) => {
    try{
        console.log(req.body);
        let result = await ratestatus.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt','Commentuser','employeeComment','rating']
            },
            include:[
                {
                    model: fix_transaction,
                    as: "fix_transaction",
                    attributes: {
                        exclude: ['createdAt','updatedAt']
                    },
                    where: {
                        status: req.body.status
                    }
                },
                {
                    model: user,
                    as: "customer",
                    attributes: {
                        exclude: ['createdAt','updatedAt','password']
                    }
                },
            ],
        })

         result=result.map( data => {
            return{
                id: data.id,
                idfix_transaction: data.idTransaction,
                idCustomer: data.idCustomer,
                fix_transaction:{
                    id: data.fix_transaction.id,
                    status: data.fix_transaction.status,
                    total: data.fix_transaction.income,
                    name: data.fix_transaction.name,
                    email: data.fix_transaction.email,
                    phone: data.fix_transaction.phone,
                    postCode: data.fix_transaction.postCode,
                    adress: data.fix_transaction.address
                },
                customer: {
                    name: data.customer.name,
                    image: process.env.FILE_PATH+data.customer.image,
                }
            }
         })

        res.status(200).send({
            message: "success",
            result
        })

    } catch(error){
        console.log(error);
        res.send({
            status: "failed",
        })
    }
}