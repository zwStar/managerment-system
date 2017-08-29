var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

export const savePhoto = function(req,res,path){


    var base64 = req.body.base64.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    var name = Date.now();
    var path = "./photo/"+path+"/"+ name +'.'+ req.body.type;
    fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
        if(err){
            console.log(err);
        }else{
            res.send({name:name+"."+req.body.type});
        }
    })



   // var form = new multiparty.Form({uploadDir: '../backEnd/photo/'+path+'/'});
    //上传完成后处理
    /* form.parse(req, function(err, fields, files) {
    
        if(err){
            console.log('parse error: ' + err);
        } else {
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = '../backEnd/photo/'+path +'/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename photo error: ' + err);
                } else {
            
                }
            });
    }
    res.send(inputFile.originalFilename);
    }); */
}