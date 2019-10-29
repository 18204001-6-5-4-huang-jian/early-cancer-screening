/**
 * Created by sunwd on 2018/10/1.
 */
const DICTIONARY = {
  // 评估状态
  evaluateStatus: [{
      id: 1,
      name: '未提交（草稿）'
    },
    {
      id: 2,
      name: '未评估'
    },
    {
      id: 4,
      name: '已评估'
    }
  ],
  // 项目状态
  projectStatus: [{
      id: 1,
      name: '正常'
    },
    {
      id: 2,
      name: '违反方案'
    },
    {
      id: 3,
      name: '退出研究'
    }
  ],
  // 质控状态
  checkStatus: [{
      id: 1,
      name: '待审核'
    },
    {
      id: 2,
      name: '审核通过'
    },
    {
      id: 3,
      name: '审核未通过'
    }
  ],
  // 通知状态
  noticeStatus: [{
      id: 1,
      name: '通知'
    },
    {
      id: 2,
      name: '未通知'
    }
  ],
  // 高危类型
  riskType: [{
      id: 1,
      name: '非高危'
    },
    {
      id: 2,
      name: '肺癌高危'
    },
    {
      id: 3,
      name: '肝癌高危'
    },
    {
      id: 4,
      name: '结直肠癌高危'
    },
    {
      id: 5,
      name: '乳腺癌高危'
    },
    {
      id: 6,
      name: '上消化道高危'
    },
    {
      id: 7,
      name: '肺肠高危'
    }
  ],
  // 角色范围
  dataLevel: [{
      id: 1,
      name: '自己'
    },
    {
      id: 2,
      name: '本部门'
    },
    {
      id: 3,
      name: '本部门及以下一级'
    },
    {
      id: 4,
      name: '本部门及以下全部'
    },
  ],
  // 签到状态
  signStatus: [{
      id: 1,
      name: '已签到'
    },
    {
      id: 2,
      name: '未签到'
    }
  ],
  // 高危类型---去掉非高危
  riskTypeNew: [{
      id: 2,
      name: '肺癌'
    },
    {
      id: 3,
      name: '肝癌'
    },
    {
      id: 4,
      name: '结直肠癌'
    },
    {
      id: 5,
      name: '乳腺癌'
    },
    {
      id: 6,
      name: '上消化道'
    }
  ],
  // 分组类型-含肺肠
  riskTypeUnderLDCTNew: [{
      id: 'fa',
      name: '肺癌'
    },
    {
      id: 'ga',
      name: '肝癌'
    },
    {
      id: 'ca',
      name: '结直肠癌'
    },
    {
      id: 'rxa',
      name: '乳腺癌'
    },
    {
      id: 'sxhda',
      name: '上消化道'
    },
    {
      id: 'facha',
      name: '肺肠A组'
    },
    {
      id: 'fachb',
      name: '肺肠B组'
    },
    {
      id: 'fachc',
      name: '肺肠C组'
    }
  ],
  types: [{
      id: 'fa',
      name: '肺癌'
    },
    {
      id: 'rxa',
      name: '乳腺癌'
    },
    {
      id: 'sxhda',
      name: '上消化道癌'
    },
    {
      id: 'ga',
      name: '肝癌'
    },
    {
      id: 'ca',
      name: '结直肠癌'
    }
  ],
  // 星期
  weeks: [{
      id: 1,
      name: '周一'
    },
    {
      id: 2,
      name: '周二'
    },
    {
      id: 3,
      name: '周三'
    },
    {
      id: 4,
      name: '周四'
    },
    {
      id: 5,
      name: '周五'
    },
    {
      id: 6,
      name: '周六'
    },
    {
      id: 7,
      name: '周日'
    }
  ],
  // 性别
  sex: [{
      id: 1,
      name: '男'
    },
    {
      id: 2,
      name: '女'
    }
  ],
  // 预约状态
  bookingStatus: [{
      id: 1,
      name: '取消预约'
    },
    {
      id: 2,
      name: '已预约'
    }
  ],
  // 预约状态
  bookcollectStatus: [{
      id: 1,
      name: '已预约'
    },
    {
      id: 2,
      name: '未预约'
    }
  ],
  // 取消签到原因
  cancelReasons: [{
      id: 1,
      name: '主动取消'
    },
    {
      id: 2,
      name: '主动放弃'
    },
    {
      id: 3,
      name: '另行预约'
    },
    {
      id: 4,
      name: '其他原因'
    }
  ],
  // 高危结果
  riskStatus: [{
      id: 1,
      name: '肺癌高危'
    },
    {
      id: 2,
      name: '肠癌高危'
    },
    {
      id: 3,
      name: '上消化道癌高危'
    },
    {
      id: 4,
      name: '肝癌高危'
    },
    {
      id: 5,
      name: '乳腺癌高危'
    }
  ],
  // 任务年度
  projectYear: [{
      id: 2018,
      name: '2018'
    },
    {
      id: 2019,
      name: '2019'
    },
    // {
    //   id: 2020,
    //   name: '2020'
    // }
  ],

  // 任务类型
  taskType: [{
      id: 'zmrw',
      name: '招募任务'
    },
    {
      id: 'scrw',
      name: '筛查任务'
    }
  ],
  // 快递状态
  courierStatus: [{
      id: 1,
      name: '已接收'
    },
    {
      id: 2,
      name: '未寄出'
    },
    {
      id: 3,
      name: '已寄出'
    }
  ],
  // 录入状态
  inputStatus: [{
      id: 1,
      name: '已录入'
    },
    {
      id: 2,
      name: '未录入'
    },
    {
      id: 3,
      name: '待提交'
    }
  ],
  inputStatus1:[
    {
      id: 1,
      name: '已录入'
    },
    {
      id: 2,
      name: '未录入'
    },
  ],
  // 筛查结果
  screeningResult: [{
      id: 1,
      name: 'AFP阳性'
    },
    {
      id: 2,
      name: '肝硬化'
    },
    {
      id: 3,
      name: '肝占位性病变'
    },
    {
      id: 4,
      name: '疑似肝癌'
    },
    {
      id: 5,
      name: '阴性'
    }
  ],
  // 人员状态
  personStatus: [{
      id: 1,
      name: '正常'
    },
    {
      id: 2,
      name: '死亡'
    },
    {
      id: 3,
      name: '退出'
    }
  ],
  // 病理结果
  pathology: [{
      id: 1,
      name: '无病理'
    },
    {
      id: 2,
      name: '未录入'
    },
    {
      id: 3,
      name: '已录入'
    }
  ],
  // 筛查结果-胃
  screeningResultW: [{
      id: 1,
      name: '胃癌'
    },
    {
      id: 2,
      name: '癌前病变'
    },
    {
      id: 3,
      name: '其他良性病变'
    },
    {
      id: 4,
      name: '阴性'
    },
    {
      id: 99,
      name: '其他'
    }
  ],
  // 筛查结果-食管
  screeningResultSG: [{
      id: 1,
      name: '食管癌'
    },
    {
      id: 2,
      name: '癌前病变'
    },
    {
      id: 3,
      name: '其他良性病变'
    },
    {
      id: 4,
      name: '阴性'
    },
    {
      id: 99,
      name: '其他'
    }
  ],
  // 筛查结果-肠癌
  colorectaResult: [{
      id: 1,
      name: '肠癌'
    }, {
      id: 2,
      name: '癌前病变'
    },
    {
      id: 3,
      name: '其他良性病变'
    },
    {
      id: 4,
      name: '阴性'
    },
    {
      id: 99,
      name: '其他'
    }

  ],
  // 肺癌筛查结果
  lungResult: [{
      id: 1,
      name: '肺癌或疑似肺癌'
    },
    {
      id: 2,
      name: '肺阳性结节'
    },
    {
      id: 3,
      name: '气道重要病变'
    },
    {
      id: 4,
      name: '半阳性结节'
    },
    {
      id: 5,
      name: '肺其他病变'
    },
    {
      id: 6,
      name: '肺外病变'
    },
    {
      id: 7,
      name: '阴性'
    },
    {
      id: 8,
      name: '肺阳性结节/气道重要病变'
    },
    {
      id: 99,
      name: '其他'
    }
  ],
  // 乳腺-筛查结果
  mammaryScreeningResult: [{
      id: '1',
      name: '阳性'
    },
    {
      id: '2',
      name: '可疑阳性'
    },
    {
      id: '3',
      name: '阴性'
    },
    // {
    //   id: '99',
    //   name: '其他'
    // },
  ],
  // 所属项目
  itemsUnderIt: [{
      id: 1,
      name: '肺肠项目'
    },
    {
      id: 2,
      name: '早诊早治'
    },
  ],
  // 预约汇总 评估结果
  newevalResult: [{
      id: 2,
      name: '肺癌高危'
    },
    {
      id: 3,
      name: '肝癌高危'
    },
    {
      id: 4,
      name: '结直肠癌高危'
    },
    {
      id: 5,
      name: '乳腺癌高危'
    },
    {
      id: 6,
      name: '上消化道癌高危'
    },
    {
      id: 7,
      name: '肺肠高危'
    }
  ],
  // 评估结果
  evalResult: [{
      id: 1,
      name: '非高危'
    },
    {
      id: 2,
      name: '肺癌高危'
    },
    {
      id: 3,
      name: '肝癌高危'
    },
    {
      id: 4,
      name: '结直肠癌高危'
    },
    {
      id: 5,
      name: '乳腺癌高危'
    },
    {
      id: 6,
      name: '上消化道癌高危'
    },
    {
      id: 7,
      name: '肺肠高危'
    }
  ],
  // 分组状态
  groupStatus: [
    // {
    //     id:1,
    //     name: '非高危'
    // },
    // {
    //     id:2,
    //     name: '早诊高危'
    // },
    {
      id: 'a',
      name: '肺肠A组'
    },
    {
      id: 'b',
      name: '肺肠B组'
    },
    {
      id: 'c',
      name: '肺肠C组'
    }
  ],

  // fit 录入结果
  entryResult: [{
      id: '1',
      name: '阴性'
    },
    {
      id: '2',
      name: '阳性'
    }, {
      id: '3',
      name: '无效'
    },
    {
      id: '4',
      name: '无结果'
    },
  ],
  // 录入结果
  resultStatus: [{
      id: 1,
      name: '阴性'
    },
    {
      id: 2,
      name: '阳性'
    }
  ],
  // 预约项目
  checkProjectCode: [{
      id: 'ct',
      name: '低剂量CT'
    },
    {
      id: 'cj',
      name: '结直肠镜'
    },
    {
      id: 'gcs',
      name: '肝癌三项'
    },
    {
      id: 'rxcs',
      name: '乳腺超声'
    },
    {
      id: 'rxxx',
      name: '乳腺X线'
    },
    {
      id: 'sxhdnj',
      name: '上消内镜'
    }
  ],
  // 签到状态
  signStatus: [{
      id: 1,
      name: '已签到'
    },
    {
      id: 2,
      name: '未签到'
    }
  ],
  // 超声筛查结果-肝
  liverScreeningResult: [
    {
      id: '1',
      name: '疑似肝癌'
    },
    {
      id: '2',
      name: '肝占位性病变'
    },
    {
      id: '3',
      name: 'AFP&HBsAg阳性'
    },
    {
      id: '4',
      name: '阴性或其他病变'
    },
    // {
    //   id: '99',
    //   name: '其他'
    // }
  ],
  // add
  //筛查状态
  ScreeningStatus:[
    {
      id: 1,
      name: '已检查'
    },
    {
      id: 2,
      name: '未检查'
    },
  ],
  //发放状态
  provideStatus:[
    {
      id: '1',
      name: '已发放'
    },
    {
      id: '2',
      name: '未发放'
    },
  ]
}

export default DICTIONARY