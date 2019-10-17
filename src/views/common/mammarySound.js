/**
 * Created by sunwd on 2018/10/19.
 */
const DATA = {
  // 1.双侧乳腺腺体形态
  item11: [
    {
      key: 1,
      name: '1.对称'
    },
    {
      key: 2,
      name: '2.不对称'
    }
  ],
  // 左侧乳腺比值
  item14: [
    {
      key: 1,
      name: '1.<=1/3;'
    },
    {
      key: 2,
      name: '2.>1/3;'
    }
  ],
  // 右侧乳腺比值
  item17: [
    {
      key: 1,
      name: '1.<=1/3;'
    },
    {
      key: 2,
      name: '2.>1/3;'
    }
  ],
  // 腺体结构
  item18: [
    {
      key: 1,
      name: '1.紊乱'
    },
    {
      key: 2,
      name: '2.清晰'
    }
  ],
  // 是否探及
  item21: [
    {
      key: 1,
      name: '1.探及'
    },
    {
      key: 2,
      name: '2.不探及'
    }
  ],
  // 腋下肿大淋巴结是否探及？
  item31: [
    {
      key: 1,
      name: '1.探及'
    },
    {
      key: 2,
      name: '2.不探及'
    }
  ],
  // 腋下肿大淋巴结有无淋巴结门
  item37: [
    {
      key: 1,
      name: '1.无'
    },
    {
      key: 2,
      name: '2.有'
    }
  ],
  // 腋下肿大淋巴结淋巴结门位置？
  item38: [
    {
      key: 1,
      name: '1.偏心'
    },
    {
      key: 2,
      name: '2.正常'
    }
  ],
  // 有无CDFI血流：血流信号？
  item39: [
    {
      key: 1,
      name: '1.无'
    },
    {
      key: 2,
      name: '2.有'
    }
  ],
  // 血流信息是否丰富？
  item310: [
    {
      key: 1,
      name: '1.丰富'
    },
    {
      key: 2,
      name: '2.不丰富'
    }
  ],
  // 血流表现
  item3101: [
    {
      key: 1,
      name: '1.树枝状'
    },
    {
      key: 2,
      name: '2.杂乱'
    }
  ],
  // 乳腺分型属于哪种类型
  breastType: [
    {
      key: 1,
      name: '1.腺体型'
    },
    {
      key: 2,
      name: '2.腺纤维型'
    },
    {
      key: 3,
      name: '3.纤维型'
    },
    {
      key: 4,
      name: '4.脂肪型'
    }
  ],
  // 是否需要国家癌症中心会诊
  isMeeting: [
    {
      key: 1,
      name: '1.否'
    },
    {
      key: 2,
      name: '2.是'
    }
  ],

  //乳腺超声结果占位表
  hosRxcsResultOccupyInfoPOS: {
    // 占位位置
    item1: [
      {
        key: 1,
        name: '1.左'
      },
      {
        key: 2,
        name: '2.右'
      }
    ],
    // 占位象限情况
    item2: [
      {
        key: 1,
        name: '1.外上象限'
      },
      {
        key: 2,
        name: '2.内上象限'
      },
      {
        key: 3,
        name: '3.外下象限'
      },
      {
        key: 4,
        name: '4.内下象限'
      }
    ],
    // 占位位置距乳头距离（cm）
    item3: [
      {
        key: 1,
        name: '1.左'
      },
      {
        key: 2,
        name: '2.右'
      }
    ],
    // 占位与胸大肌关系
    item4: [
      {
        key: 1,
        name: '1.清'
      },
      {
        key: 2,
        name: '2.不清'
      }
    ],
    // 占位与皮肤关系
    item5: [
    {
      key: 1,
      name: '1.清'
    },
    {
      key: 2,
      name: '2.不清'
    }
  ],
    // 占位形态
    item7: [
      {
        key: 1,
        name: '1.类圆形'
      },
      {
        key: 2,
        name: '2.不规则'
      }
    ],
    // 占位边界
    item8: [
      {
        key: 1,
        name: '1.清'
      },
      {
        key: 2,
        name: '2.不清'
      }
    ],
    // 内回声
    item9: [
      {
        key: 1,
        name: '1.无'
      },
      {
        key: 2,
        name: '2.低'
      },
      {
        key: 3,
        name: '3.中'
      },
      {
        key: 4,
        name: '4.高'
      }
    ],
    // 占位内中回声均匀
    item91: [
      {
        key: 1,
        name: '1.均匀'
      },
      {
        key: 2,
        name: '2.不均匀'
      },
      {
        key: 3,
        name: '3.欠均匀'
      }
    ],
    // 占位内回声中强回声光点
    item92: [
      {
        key: 1,
        name: '1.探及'
      },
      {
        key: 2,
        name: '2.未探及'
      }
    ],
    // 占位内回声中强回声光团
    item93: [
      {
        key: 1,
        name: '1.探及'
      },
      {
        key: 2,
        name: '2.未探及'
      }
    ],
    // 占位内回声中无回声区
    item94: [
      {
        key: 1,
        name: '1.探及'
      },
      {
        key: 2,
        name: '2.未探及'
      }
    ],
    // 占位内回声中结节或肿物后方回声
    item95: [
      {
        key: 1,
        name: '1.未见改变'
      },
      {
        key: 2,
        name: '2.衰减'
      },
      {
        key: 3,
        name: '3.增强'
      }
    ],
    // 占位内回声中侧方声影
    item96: [
      {
        key: 1,
        name: '1.无'
      },
      {
        key: 2,
        name: '2.有'
      }
    ],
    // 有无CDFI血流：血流信号
    item10: [
      {
        key: 1,
        name: '1.无'
      },
      {
        key: 2,
        name: '2.有'
      }
    ],
    // 血流信息是否丰富
    item101: [
      {
        key: 1,
        name: '1.丰富'
      },
      {
        key: 2,
        name: '2.不丰富'
      }
    ]
  },
  //乳腺超声结果乳腺分型与超声诊断表
  hosRxcsResultOccupyDiagnosisInfoPOS: {
    // 占位1的超声诊断属于哪种
    diagnosisType: [
      {
        key: 1,
        name: '1.囊肿'
      },
      {
        key: 2,
        name: '2.腺病'
      },
      {
        key: 3,
        name: '3.纤维腺瘤'
      },
      {
        key: 4,
        name: '4.乳导管扩张'
      },
      {
        key: 5,
        name: '5.良性病变'
      },
      {
        key: 6,
        name: '6.良性病变可能大'
      },
      {
        key: 7,
        name: '7.不除外恶性病变'
      },
      {
        key: 8,
        name: '8.恶性病变'
      },
      {
        key: 9,
        name: '9.乳腺占位性病变'
      },
      {
        key: 10,
        name: '10.淋巴结肿大'
      },
      {
        key: 11,
        name: '11.其他'
      }
    ],
    // 占位1的超声诊断属于哪种？
    biRads: [
      {
        key: 1,
        name: '0类：超声未能完成评价，建议乳腺X线摄影或MRI检查'
      },
      {
        key: 2,
        name: '1类：阴性，超声未见异常发现'
      },
      {
        key: 3,
        name: '2类：考虑良性病变'
      },
      {
        key: 4,
        name: '3类：可能良性病变，建议3-6个月后随访'
      },
      {
        key: 5,
        name: '4类：可疑恶性病变，但不具备典型的恶性病变超声征象，建议穿刺活检'
      },
      {
        key: 6,
        name: '5类：高度提示恶性病变，有典型的恶性病变超声征象'
      }
    ]
  },
  // 非占位病变的超声诊断属于哪种？
  noItem4: [
    {
      key: 1,
      name: '乳导管扩张（无占位）'
    },
    {
      key: 2,
      name: '其他'
    }
  ],
  // 非占位BI-RADS分类
  noItem5: [
    {
      key: 1,
      name: '0类：超声未能完成评价，建议乳腺X线摄影或MRI检查'
    },
    {
      key: 2,
      name: '1类：阴性，超声未见异常发现'
    }
  ],
}

export default DATA