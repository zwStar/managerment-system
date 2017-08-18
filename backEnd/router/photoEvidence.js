var express = require("express")
var router = express.Router();

var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

router.post("/",function(req,res){
    var form = new multiparty.Form({uploadDir: '../backEnd/photo/photoEvidence/'});
       //上传完成后处理
       form.parse(req, function(err, fields, files) {
         //var filesTmp = JSON.stringify(files,null,2);
     
        if(err){
           console.log('parse error: ' + err);
        } else {
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = '../backEnd/photo/photoEvidence/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
       }
        res.send(inputFile.originalFilename);
      });
})

module.exports = router;