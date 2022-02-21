
const { fix_transaction,transaction } = require("../../models");

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
                }
            ]
        });

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

exports.addFixTransactions= async (req, res) => {
    try{

        let result= await fix_transaction.create(req.body);

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

