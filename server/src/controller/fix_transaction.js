
const { fix_transaction,transaction } = require("../../models");

exports.getFixTransactions= async (req, res) => {
    try{

        let result= await fix_transaction.findAll({
            include:[
                {
                    model: transaction,
                    as: "transaction"
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