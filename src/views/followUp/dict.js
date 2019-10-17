/**
 * Created by leicj on 2019/5/28.
 */
const DICTIONARY = {
  // 是否
  isFlag: [{
    id: 1,
    name: '是'
  }, {
    id: 2,
    name: '否'
  }],
  // 最后接触状态
  contactStatus: [{
      id: 1,
      name: '存活'
    },
    {
      id: 2,
      name: '死亡'
    }
  ],

  // 诊断依据
  cancerBase: [{
      id: 1,
      name: '临床'
    },
    {
      id: 2,
      name: 'X线、CT、超声、内窥镜'
    },
    {
      id: 3,
      name: '手术、尸检（无病理）'
    },
    {
      id: 4,
      name: '生化、免疫、肿瘤标记物'
    },
    {
      id: 5,
      name: '细胞学、血片'
    },
    {
      id: 6,
      name: '病理（继发）'
    },
    {
      id: 7,
      name: '病理（原发）'
    },
    {
      id: 8,
      name: '尸检（有病理）'
    },
    {
      id: 9,
      name: '不详'
    },
    {
      id: 0,
      name: '死亡补发病'
    },
  ],
  // 分期
  stage: [{
      id: '1',
      name: '0-Ⅰ期'
    },
    {
      id: '2',
      name: 'Ⅱ期'
    },
    {
      id: '3',
      name: 'Ⅲ期'
    },
    {
      id: '4',
      name: 'Ⅳ期'
    },
    {
      id: '5',
      name: '不详'
    }
  ],
  // T
  T: [{
      id: '5',
      name: 'X'
    }, {
      id: '6',
      name: 'is'
    }, {
      id: '0',
      name: '0'
    },
    {
      id: '1',
      name: '1'
    },
    {
      id: '2',
      name: '2'
    },
    {
      id: '3',
      name: '3'
    },
    {
      id: '4',
      name: '4'
    }
  ],
  // N
  N: [{
      id: '4',
      name: 'X'
    }, {
      id: '0',
      name: '0'
    },
    {
      id: '1',
      name: '1'
    },
    {
      id: '2',
      name: '2'
    },
    {
      id: '3',
      name: '3'
    },

  ],
  // M
  M: [{
      id: '0',
      name: '0'
    },
    {
      id: '1',
      name: '1'
    },
  ],
  // 评估结果
  riskType: [{
      id: '非高危',
      name: '非高危'
    },
    {
      id: '肺癌高危',
      name: '肺癌高危'
    },
    {
      id: '肝癌高危',
      name: '肝癌高危'
    },
    {
      id: '结直肠癌高危',
      name: '结直肠癌高危'
    },
    {
      id: '乳腺癌高危',
      name: '乳腺癌高危'
    },
    {
      id: '上消化道癌高危',
      name: '上消化道癌高危'
    },
    {
      id: '肺肠高危',
      name: '肺肠高危'
    }
  ],
  // 随访-筛查结果
  followScreeningResult: [{
      id: '肺癌筛查阳性',
      name: '肺癌筛查阳性'
    },
    {
      id: '肠癌筛查阳性',
      name: '肠癌筛查阳性'
    },
    {
      id: '乳腺癌筛查阳性',
      name: '乳腺癌筛查阳性'
    },
    {
      id: '食道癌筛查阳性',
      name: '食道癌筛查阳性'
    },
    {
      id: '胃癌筛查阳性',
      name: '胃癌筛查阳性'
    },
    {
      id: '肝癌筛查阳性',
      name: '肝癌筛查阳性'
    }
  ],
  // 随访状态
  followUpStatus: [{
      id: 0,
      name: '未随访'
    },
    {
      id: 1,
      name: '随访中'
    },
    {
      id: 9,
      name: '已随访'
    }
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
}

export default DICTIONARY