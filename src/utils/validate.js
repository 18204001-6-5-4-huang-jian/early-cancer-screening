//用于验证手机号
const checkPhone = (rule, value, callback) => {
    if (value && !(/^\d{11}$/.test(value))) {
      callback(new Error('请输入11位手机号'))
    }else {
      callback();
    }
    // if (!value) {
    //     return callback(new Error('手机号不能为空'));
    //   } else {
    //     const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    //     if (reg.test(value)) {
    //       callback();
    //     } else {
    //       return callback(new Error('请输入正确的手机号'));
    //     }
    //   }
  };
  
  // 2-20个字的校验
  const checkFont = (rule, value, callback) => {
    if (value && !(value.length>1)) {
      callback(new Error('请输入2-20个字'))
    }else {
      callback();
    }
  };
  
  //不超过两百个字符
  const length200 = (rule, value, callback) => {
      if (value && !(value.length<200)){
          callback(new Error('最大可输入200个字符'))
      }else {
          callback();
      }
  };
  // 纯汉字
  const checkFontH = (rule, value, callback) => {
      if (value && !(/^[\u4e00-\u9fa5]+$/.test(value))) {
          callback(new Error('输入格式错误，请重新输入'))
        }else {
          callback();
        }
    };
  
  // 身份证号的校验
  const idCard = (rule, value, callback) => {
    if (value && !(/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(value))) {
      callback(new Error('身份证号格式不对'))
    }else {
      callback();
    }
  }
  // 5位数字包含1位小数
  const count5 = (rule, value, callback) => {
      if (value && !(/^([1-9]\d{0,2}|0)(\.\d{1}){0,1}$/.test(value))) {
          callback(new Error('请输入0-999，小数点后一位'))
      }else if(Number(value)>999){
          callback(new Error('请输入0-999，小数点后一位'))
      }else {
          callback();
      }
  };
  // 最多5位数字
  const countLength5 = (rule, value, callback) => {
      if (value && !(/^[0-9]{1,5}$/.test(value))) {
          callback(new Error('请输入不超过5位的数字'))
      }else {
          callback();
      }
  };
    // 最多3位数字
    const countLength3 = (rule, value, callback) => {
        if (value && !(/^[0-9]{1,3}$/.test(value))) {
            callback(new Error('请输入不超过3位的数字'))
        }else {
            callback();
        }
    };
  // 数字
  const count = (rule, value, callback) => {
      if (value && !(/^[0-9]$/.test(value))) {
          callback(new Error('请输入正整数'))
      }else {
          callback();
      }
  };
  // 纯整数数字
  const countZS = (rule, value, callback) => {
      if (value && !(/^[0-9]{1,}$/.test(value))) {
          callback(new Error('请输入整数'))
      }else {
          callback();
      }
  };
  // 大于0的整数
  const countB0 = (rule, value, callback) => {
      if (value && !(/^[0-9]{1,}$/.test(value))) {
          callback(new Error('大于0的整数'))
      }else if(value == 0) {
          callback(new Error('大于0的整数'))
      }else{
          callback();
      }
  };
  // 数字20以内
  const count20 = (rule, value, callback) => {
      if (value && !(/^[0-9]{1,2}$/.test(value))) {
          callback(new Error('请输入1-20的整数'))
      }else if (value<1||value>20 ) {
          callback(new Error('请输入1-20的整数'))
      }else {
          callback();
      }
  };
  // 数字50以内
  const count50 = (rule, value, callback) => {
      if (value && !(/^[0-9]{1,2}$/.test(value))) {
          callback(new Error('请输入1-50的整数'))
      }else if (value<1||value>50 ) {
          callback(new Error('请输入1-50的整数'))
      }else {
          callback();
      }
  };
  // 数字40以内小数
  const count40a = (rule, value, callback) => {
       if(value == 0 && String(value).indexOf('.') == -1){
          if(String(value).length > 1){
            callback(new Error('请输入，0-40之内的数字，小数点后两位'))
         }else{
            callback();
         }
       }else if(String(value).split('.')[1] && String(value).split('.')[1].length > 2){
          callback(new Error('请输入，0-40之内的数字，小数点后两位'))
       }else if (value && !(/^[0-9]{1,2}\.\d{0,2}$/.test(value))) {
          callback(new Error('请输入，0-40之内的数字，小数点后两位'))
      } else if (value < 0 || value > 40) {
          callback(new Error('请输入，0-40之内的数字，小数点后两位'))
      } else {
          callback();
      }
  };
// 数字40以内
  const count40 = (rule, value, callback) => {
    if (value && !(/^[0-9]{1,2}$/.test(value))) {
        callback(new Error('请输入1-40的整数'))
    } else if (value < 1 || value > 40) {
        callback(new Error('请输入1-40的整数'))
    }else{
        callback();
    }
}
  // 数字60以内小数
  const count60a = (rule, value, callback) => {
      if(value == 0 && String(value).indexOf('.') == -1){
          if(String(value).length > 1){
             callback(new Error('请输入0-60之内的数字，小数点后两位'))
          }else{
            callback();
          }
      }else if(String(value).split('.')[1] && String(value).split('.')[1].length > 2){
          callback(new Error('请输入0-60之内的数字，小数点后两位'))
      }else if (value && !(/^[0-9]{1,2}\.\d{0,2}$/.test(value))) {
          callback(new Error('请输入0-60之内的数字，小数点后两位'))
      } else if (value < 0 || value > 60) {
          callback(new Error('请输入0-60之内的数字，小数点后两位'))
      } else {
          callback();
      }
  };

    // 数字60以内小数---不含0
    const count60b = (rule, value, callback) => {
        if (value && !(/^(([1-5]\d|[0-9])(\.\d{1,2})|([1-5]\d|[0-9]|60))$/.test(value))) {
            callback(new Error('请输入0-60之内的数字，小数点后两位'))
        }else if(value <= 0 || value > 60){
            callback(new Error('请输入0-60之内的数字，小数点后两位'))
        }else{
            callback();
        }
    };
//   
const count60 = (rule, value, callback) => {
    if (value && !(/^[0-9]{1,2}$/.test(value))) {
        callback(new Error('请输入1-60的整数'))
    } else if (value < 1 || value > 60) {
        callback(new Error('请输入1-60的整数'))
    }else{
        callback();
    }
}
  // 1-50之内的数字，保留小数点后两位
  const countFloat50 = (rule, value, callback) => {
      if (value && !(/^(([1-4]\d|[1-9])(\.\d{1,2})|([1-4]\d|[1-9]|50 |50.00|50.0))$/.test(value))) {
          callback(new Error('请输入1-50之内的数字，小数点后两位'))
      }else if(value < 1 || Number(value) > 50){
          callback(new Error('请输入1-50之内的数字，小数点后两位'))
      }else{
          callback();
      }
  };
  // 0-50之内的数字，保留小数点后两位
  const countFloat050 = (rule, value, callback) => {
      if (value && !(/^(([1-4]\d|[0-9])(\.\d{1,2})|([1-4]\d|[0-9]|50))$/.test(value))) {
          callback(new Error('请输入0-50之内的数字，小数点后两位'))
    //   }else if(value == 0 || value > 50){
      }else if(value < 0 || value > 50){
          callback(new Error('请输入0-50之内的数字，小数点后两位'))
      }else{
          callback();
      }
  };
  // 1-100之内的数字，小数点后两位
  const countFloat100 = (rule, value, callback) => {
      if (value && !(/^(([1-9]\d|[1-9])(\.\d{1,2})|([1-9]\d|[1-9]|100))$/.test(value))) {
          callback(new Error('请输入1-100之内的数字，小数点后两位'))
      }else if(value < 1 || value >100){
          callback(new Error('请输入1-100之内的数字，小数点后两位'))
      }else{
          callback();
      }
  };
  // 0-100之内的数字，小数点后两位
  const countFloat0100 = (rule, value, callback) => {
      if(String(value) == '100.0' || String(value) == '100.00'){
          callback();
      }else if (value && !(/^(([1-9]\d|[0-9])(\.\d{1,2})|([1-9]\d|[0-9]|100))$/.test(value))) {
          callback(new Error('0-100之内的数字，小数点后两位'))
      }else if(value >100){
          callback(new Error('0-100之内的数字，小数点后两位'))
      }else{
          callback();
      }
  };
  // 1-100之内的整数
  const countInit100 = (rule, value, callback) => {
      if (value && !(/^([1-9]\d|[1-9]|100)$/.test(value))) {
          callback(new Error('请输入1-100的整数'))
      }else if(value < 1 || value >100){
          callback(new Error('请输入1-100的整数'))
      }else{
          callback();
      }
  };
  // 0-100之内的整数
  const countInit0100 = (rule, value, callback) => {
      if (value && !(/^([1-9]\d|[1-9]|100|0)$/.test(value))) {
          callback(new Error('请输入0-100的整数'))
      }else if(value >100){
          callback(new Error('请输入0-100的整数'))
      }else{
          callback();
      }
  };
  // 1-10的整数
  const countInit10 = (rule, value, callback) => {
      if (value && !(/^([1-9]|10)$/.test(value))) {
          callback(new Error('请输入1-10的整数'))
      }else if(value < 1 || value >10){
          callback(new Error('请输入1-10的整数'))
      }else{
          callback();
      }
  };
  // 1-12的整数
  const countInit12 = (rule, value, callback) => {
      if (value && !(/^([1-9]|10|11|12)$/.test(value))) {
          callback(new Error('请输入1-12的整数'))
      }else if(value < 1 || value >12){
          callback(new Error('请输入1-12的整数'))
      }else{
          callback();
      }
  };
  // 0-12的整数
  const countInit012 = (rule, value, callback) => {
      if (value && !(/^([1-9]|10|11|12|0)$/.test(value))) {
          callback(new Error('请输入0-12的整数'))
      }else if(value >12){
          callback(new Error('请输入0-12的整数'))
      }else{
          callback();
      }
  };
    // 0-11的整数
    const countInit011 = (rule, value, callback) => {
        if (value && !(/^([1-9]|10|11|0)$/.test(value))) {
            callback(new Error('请输入0-11的整数'))
        }else if(value >11){
            callback(new Error('请输入0-11的整数'))
        }else{
            callback();
        }
    };
  // 20以内的整数
  const countInit20 = (rule, value, callback) => {
      if (value && !(/^([1-9]|[1]\d|20)$/.test(value))) {
          callback(new Error('请按照取材部位填写顺序号，如：1，2，3…20'))
      }else if(value < 1 || value >20){
          callback(new Error('请按照取材部位填写顺序号，如：1，2，3…20'))
      }else{
          callback();
      }
  };
  // 身高50-300
  const countSG = (rule, value, callback) => {
      if (value && !(/^([5-9]\d{1}|[1-2]\d{2}|300)$/.test(value))) {
          callback(new Error('请输入50-300之间的整数'))
      }else if(value < 50 || value >300){
          callback(new Error('请输入50-300之间的整数'))
      }else{
          callback();
      }
  };
  // 体重20-300
  const checkTZ = (rule, value, callback) => {
      if (value && !(/^([2-9]\d{1}|[1-2]\d{2}|300|([2-9]\d{1}|[1-2]\d{2}|300)(\.\d{1}))$/.test(value))) {
          callback(new Error('请输入20-300之间的数字，小数点后一位'))
      }else if(value < 20 ||  value>300){
          callback(new Error('请输入20-300之间的数字，小数点后一位'))
      }else {
          callback();
      }
  };
  // 腰围40-300
  const checkYW = (rule, value, callback) => {
      if (value && !(/^([4-9]\d{1}|[1-3]\d{2}|400)$/.test(value))) {
          callback(new Error('请输入40-400之间的整数'))
      }else if(value < 40 || value >400){
          callback(new Error('请输入40-400之间的整数'))
      }else{
          callback();
      }
  };
  // 12-99
  const checkY = (rule, value, callback) => {
      if (value && !(/^([2-9]\d{1}|[1][2-9]{1})$/.test(value))) {
          callback(new Error('请输入12-99之间的整数'))
      }else if(value < 12 || value >99){
          callback(new Error('请输入12-99之间的整数'))
      }else{
          callback();
      }
  };
  // 1-999
  const count999 = (rule, value, callback) => {
      if (value && !(/^([1-9]\d{0,2})$/.test(value))) {
          callback(new Error('请输入1-999之间的整数'))
      }else if(value < 1 || value >999){
          callback(new Error('请输入1-999之间的整数'))
      }else{
          callback();
      }
  };
  // 1-99
  const count99 = (rule, value, callback) => {
      if (value && !(/^([1-9]\d{0,1})$/.test(value))) {
          callback(new Error('请输入1-99之间的整数'))
      }else if(value < 1 || value >99){
          callback(new Error('请输入1-99之间的整数'))
      }else{
          callback();
      }
  };
  // 0-99
  const count099 = (rule, value, callback) => {
      if (value && !(/^([0-9]\d{0,1})$/.test(value))) {
          callback(new Error('请输入0-99之间的整数'))
      }else if(value < 0 || value >99 || String(value) == '00'){
          callback(new Error('请输入0-99之间的整数'))
      }else{
          callback();
      }
  };
  // 0.5-99.5激素替代治疗的年数
  const count99Float = (rule, value, callback) => {
      if (value && !(/^(([1-9]\d{0,1})((\.[5]){0,1})|0.5)$/.test(value))) {
          callback(new Error('请输入正确的治疗年数（半年填0.5）'))
      }else if(value < 0 || value >99.5){
          callback(new Error('请输入正确的治疗年数（半年填0.5）'))
      }else{
          callback();
      }
  };
  
  // 0-20000之内的数字，小数点后两位
  const countFloatAFP = (rule, value, callback) => {
      if (value && !(/^((0|[1-9]\d{0,4}|[1]\d{0,4}|20000)(\.[0-9]{0,2}){0,1})$/.test(value))) {
          callback(new Error('取值范围0.01-20000.00'))
      }else if(Number(value) >20000 || Number(value) ==0){
          callback(new Error('取值范围0.01-20000.00'))
      }else{
          callback();
      }
  };
  // 机构编码，2位数字校验
  const deptCode = (rule, value, callback) => {
      if (value && !(/^(\d{2})$/.test(value))) {
          callback(new Error('请输入2位数字'))
      }else{
          callback();
      }
  };
  // add 0-50
const add050 = (rule,value,callback) => {
    if (value && !(/^(([1-4]\d|50|[0-9])(\.\d{1,2})|([1-4]\d|[0-9]|50|50.0|50.00))$/.test(value))) {
        callback(new Error('请输入0-50的数字，小数点后两位'))
    }else if(value < 0 || value > 50){
        callback(new Error('请输入0-50的数字，小数点后两位'))
    }else{
        callback();
    }
}
// add 0-100
const add0100 = (rule,value,callback) => {
    if(String(value) == '100.0' || String(value) == '100.00'){
        callback();
    }else if (value && !(/^(([1-9]\d|[0-9])(\.\d{1,2})|([1-9]\d|[0-9]|100))$/.test(value))) {
        callback(new Error('请输入0-100的数字，小数点后两位'))
    }else if(value < 0 || value > 100){
        callback(new Error('请输入0-100的数字，小数点后两位'))
    }else{
        callback();
    }
}
// add 0-500
const add0500 = (rule,value,callback) => {
    if (value && !(/^(500.00|500.0|500|([1-4]\d{2}|\d|\d{2})(\.\d+)?)$/.test(value))) {
        callback(new Error('请输入0-500的数字，小数点后两位'))
        }else if(value < 0 || value > 500){
        callback(new Error('请输入0-500的数字，小数点后两位'))
        }else{
        callback();
        }
}
// add 0-5
const add05 = (rule,value,callback) => {
    if (value && !(/^(5.00|5.0|5|([0-4])(\.\d+)?)$/.test(value))) {
        callback(new Error('请输入0-5的数字，小数点后两位'))
    }else if(value < 0 || value > 5){
        callback(new Error('请输入0-5的数字，小数点后两位'))
    }else{
        callback();
    }
}
// add 0-20
const add020 = (rule,value,callback) => {
    if (value && !(/^(20.00|20.0|20|([1][0-9]|\d)(\.\d+)?)$/.test(value))) {
        callback(new Error('请输入0-20的数字，小数点后两位'))
    }else if(value < 0 || value > 20){
        callback(new Error('请输入0-20的数字，小数点后两位'))
    }else{
        callback();
    }
}
// 0<data<=50,小数点后一位
const count50a = (rule,value,callback) => {
    if (value && !(/^(([1-4]\d|50|[0-9])(\.\d{1})|([1-4]\d|[1-9]|50|50.0))$/.test(value))) {
        callback(new Error('请输入0-50的数字，小数点后一位'))
    }else if(value <= 0 || value > 50){
        callback(new Error('请输入0-50的数字，小数点后一位'))
    }else{
        callback();
    }
}
  export default {
    checkPhone,
    checkFont,
    checkFontH,
    idCard,
    count5,
    countLength5,
    countLength3,
    count,
    count20,
    count50,
    count40,
    count40a,
    count60,
    count60a,
    countFloat50,
    countFloat050,
    countFloat100,
    countFloat0100,
    countInit100,
    countInit10,
    countInit12,
    countInit20,
    countInit0100,
    countInit012,
    countInit011,
    length200,
    countSG,
    checkTZ,
    checkYW,
    checkY,
    count999,
    count99,
    count099,
    countZS,
    countB0,
    count99Float,
    countFloatAFP,
    deptCode,
    add050,
    add0100,
    add0500,
    add05,
    add020,
    count60b,
    count50a
  }
  