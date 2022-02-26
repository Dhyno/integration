const { user }= require("../../models");
const fs=require('fs');
const path=require('path');

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


exports.changeImage = async (req, res) => {
    try{

      // console.log(req.user);
      // console.log(req.file);

      let{ image } = await user.findOne({
        where: {
            id: req.user.id
        }
      })

      //ifimage of user not deafult-user.png then delete it and change with new image in upload path
      if(image != "default-user.png"){
        image=path.join(__dirname,'../../uploads',image)
        fs.unlink(image,(err)=>{
            console.log(err);
            if(err){
              return res.status(500).send({
                status: "server error"
              })
            }  
        });
      }

      const result = await user.update(
        { image: req.file.filename  },
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
