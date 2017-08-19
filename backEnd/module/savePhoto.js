var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

export const savePhoto = function(req,res,path){
    var form = new multiparty.Form({uploadDir: '../backEnd/photo/'+path+'/'});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
    
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
    });
}