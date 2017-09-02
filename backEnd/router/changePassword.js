var express = require("express");
var router = express.Router();
var md5 = require("../module/md5")
var teacher = require("../module/teacher")

router.post("/",function(req,res){
    teacher.findOne({workNumber:req.body.workNumber},'password',function(error,result){
        if(error){
            console.log("error in router/changePassword.js");
            console.log(error);
            res.send("error");
        }else{
            var oldPassword = md5(req.body.oldPassword);
            if( result == oldPassword ){
                teacher.update(
                    {workNumber:req.body.workNumber},
                    {$set:{
                        password:md5(req.body.newPassword);
                    }},
                    (error,rec)=>{
                        if(error){
                            console.log("error in update teacher's password (router/changePassword.js)");
                            console.log(error);
                            res.send(error);
                        }else{
                            res.send("successful");
                        }
                    })
            }else{

            }
        }
    })
});

export default router;