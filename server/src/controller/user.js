const { user }= require("../../models");

exports.changeName = async (req, res) => {
    try{

      const result = await user.update(
        { name: req.body.name  },
        {
            where: {
                id: req.user.id
            }
        }
      )
  
      res.status(200).send({
        status: "success",
        result
      })
  
    } catch(error){
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: error
      })
    }
  }


  exports.reloadProfile = async (req, res) => {
    try{
        
        const result = await user.findOne({
            where: {
                id: req.user.id
            }
        })
        
      res.status(200).send({
        status: "success",
        result
      })
  
    } catch(error){
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: error
      })
    }
  }
