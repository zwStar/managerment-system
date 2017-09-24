/**
 * Created by Administrator on 2017/8/3.
 */
const state = {
    rules:{
        name:[
            { required:true , message:'请输入姓名' ,trigger:'blur'},
            { min:2 , max:5 ,message:'长度2到5个汉字',pattern:/[\u4e00-\u9fa5]{2,5}/,trigger:'blur'}
        ],
        age:[
            {required:true,message:"请输入两位数字",pattern:/^[0-9]{2}$/,trigger:'blur'}
        ],
        sex:[
            {required:true,message:'请选择性别'}
        ],
        date:[
            {required:true,message:'请选择日期'}
        ],
        tel:[
            {required:true,message:'请输入手机号码',pattern:/^[0-9]{11}$/,trigger:'blur'}
        ]
    }
}

export default {
    state
}