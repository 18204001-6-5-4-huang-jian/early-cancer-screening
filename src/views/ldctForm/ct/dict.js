/**
 * Created by leicj on 2019/5/22.
 */
const DICT = {
    //品牌下拉框数据
    brands: [{
            label: 'GE',
            value: '1',
            child: [{
                    label: 'Revolution CT Xtream Edition',
                    value: '1'
                },
                {
                    label: 'Revolution Frontier',
                    value: '2'
                },
                {
                    label: 'Revolution HD',
                    value: '3'
                },
                {
                    label: 'Revolution ACT',
                    value: '4'
                },
                {
                    label: 'Revolution EVO',
                    value: '5'
                },
                {
                    label: 'Discovery  CT750  HD',
                    value: '6'
                },
                {
                    label: 'Discovery  CT590 RT',
                    value: '7'
                },
                {
                    label: 'Discovery RT',
                    value: '8'
                },
                {
                    label: 'Discovery CT',
                    value: '9'
                },
                {
                    label: 'Optima CT680',
                    value: '10'
                }, {
                    label: 'Optima CT 670',
                    value: '11'
                },
                {
                    label: 'Optima CT660',
                    value: '12'
                },
                {
                    label: 'Optima CT 540',
                    value: '13'
                },
                {
                    label: 'Optima CT 520',
                    value: '14'
                },
                {
                    label: 'Optima CT520 Pro',
                    value: '15'
                },
                {
                    label: 'Bright Speed Elite Select',
                    value: '16'
                },
                {
                    label: 'Bright Speed Elite',
                    value: '17'
                },
                {
                    label: 'Bright Speed 16',
                    value: '18'
                },
                {
                    label: 'Bright Speed 16pro',
                    value: '19'
                },
                {
                    label: 'Bright Speed Excel',
                    value: '20'
                },
                {
                    label: 'Light Speed VCT',
                    value: '21'
                },
                {
                    label: 'Light Speed16',
                    value: '22'
                },
                {
                    label: 'Light speed pro16',
                    value: '23'
                },
                {
                    label: 'Light speed pro32',
                    value: '24'
                },
                {
                    label: 'Light Speed Ultra',
                    value: '25'
                },
                {
                    label: 'Brivo CT315',
                    value: '26'
                },
                {
                    label: 'Brivo CT325',
                    value: '27'
                },
                {
                    label: 'Brivo CT385',
                    value: '28'
                },
            ]
        },
        {
            label: 'Siemens',
            value: '2',
            child: [{
                    label: 'SOMATOM Spirit',
                    value: '1'
                },
                {
                    label: 'SOMATOM Emotion',
                    value: '2'
                },
                {
                    label: 'SOMATOM Perspective',
                    value: '3'
                },
                {
                    label: 'SOMATOM Sensation 40/Open',
                    value: '4'
                },
                {
                    label: 'SOMATOM Force',
                    value: '5'
                },
                {
                    label: 'SOMATOM Definition Edge',
                    value: '6'
                },
                {
                    label: 'SOMATOM Definition AS',
                    value: '7'
                },
                {
                    label: 'SOMATOM Definition Flash',
                    value: '8'
                },
                {
                    label: 'SOMATOM Drive',
                    value: '9'
                }
            ]
        },
        {
            label: 'Philips',
            value: '3',
            child: [{
                    label: 'MX16EVO2',
                    value: '1'
                },
                {
                    label: 'Access CT',
                    value: '2'
                },
                {
                    label: 'Flex 16',
                    value: '3'
                },
                {
                    label: 'Ingenuity CT',
                    value: '4'
                },
                {
                    label: 'Ingenuity core 128',
                    value: '5'
                },
                {
                    label: 'Brilliance iCT',
                    value: '6'
                },
                {
                    label: 'IQon Spectral CT',
                    value: '7'
                },
            ]
        },
        {
            label: 'Toshiba',
            value: '4',
            child: [{
                    label: 'Aquilion TM ONE',
                    value: '1'
                },
                {
                    label: 'Aquilion TM ViSION',
                    value: '2'
                },
                {
                    label: 'Aquilion TM PRIME 128',
                    value: '3'
                },
                {
                    label: 'Aquilion TM PRIME 160',
                    value: '4'
                },
                {
                    label: 'Aquilion TM CXL',
                    value: '5'
                },
                {
                    label: 'Aquilion TM RXL',
                    value: '6'
                },
                {
                    label: 'Aquilion TM',
                    value: '7'
                },
                {
                    label: 'AlexionTM/Access edition',
                    value: '8'
                },
                {
                    label: 'Activion ONE  TSX-031A',
                    value: '9'
                },
                {
                    label: 'Activion ONE  TSX-101A',
                    value: '10'
                },
            ]
        },
        {
            label: '联影',
            value: '5',
            child: [{
                    label: 'uCT 780（160层）',
                    value: '1'
                },
                {
                    label: 'uCT 760（128层）',
                    value: '2'
                },
                {
                    label: 'uCT 530（40排40层）',
                    value: '3'
                },
                {
                    label: 'uCT 510（16层）',
                    value: '4'
                },
            ]
        },
        {
            label: '其他',
            value: '6',
            child: []
        },
    ],
    //严重程度下拉框数据
    severitys: [{
            label: '轻度',
            value: '1',
        },
        {
            label: '中度',
            value: '2',
        },
        {
            label: '重度',
            value: '3',
        },
        {
            label: '难以判断',
            value: '4',
        },
    ],
    //形状
    shapes: [{
            label: '圆形',
            value: '1'
        },
        {
            label: '椭圆形',
            value: '2'
        },
        {
            label: '分叶状',
            value: '3'
        },
        {
            label: '不规则',
            value: '4'
        },
        {
            label: '不能定义',
            value: '5'
        },
    ],
    //边缘
    edges: [{
            label: '毛刺(星状)',
            value: '1'
        },
        {
            label: '光滑',
            value: '2'
        },
        {
            label: '模糊',
            value: '3'
        },

        {
            label: '不能定义',
            value: '4'
        },
    ],
    methodsOptions: [{
            value: '1',
            label: 'CT'
        },
        {
            value: '2',
            label: 'CXR(胸部X线检查)'
        },
        {
            value: '3',
            label: 'MRI(磁共振)'
        },
        {
            value: '4',
            label: 'PET-CT(正电子发射CT扫描)'
        },
        {
            value: '5',
            label: 'LDCT(低剂量螺旋CT)'
        },
    ],
    anatomyPositions: [{
            value: '1',
            label: '右上叶'
        },
        {
            value: '2',
            label: '右中叶'
        },
        {
            value: '3',
            label: '右下叶'
        },
        {
            value: '4',
            label: '左上叶'
        },
        {
            value: '5',
            label: '左下叶'
        },
        {
            value: '6',
            label: '叶间胸膜面'
        },
    ],
    densitys: [{
            value: '1',
            label: '实性'
        },
        {
            value: '2',
            label: '部分实性*'
        },
        {
            value: '3',
            label: '非实性(纯磨玻璃密度)'
        },
    ],
    densityOthers: [{
            value: '1',
            label: '空泡'
        },
        {
            value: '2',
            label: '空腔'
        },
        {
            value: '3',
            label: '空洞'
        },
        {
            value: '4',
            label: '坏死'
        },
        {
            value: '5',
            label: '钙化'
        },
    ],

    nodularViewDates: [{
            value: '1',
            label: '空泡'
        },
        {
            value: '2',
            label: '空腔'
        },
        {
            value: '3',
            label: '空洞'
        },
        {
            value: '4',
            label: '坏死'
        },
        {
            value: '5',
            label: '钙化'
        },
    ],
    proposals1: [{
            value: '1',
            label: '经皮穿刺'
        },
        {
            value: '2',
            label: '经支气管镜'
        },
        {
            value: '3',
            label: '其他'
        },
    ],
    proposals: [{
            value: '1',
            label: '年度复查'
        },
        {
            value: '2 ',
            label: '3个月复查'
        },
        {
            value: '3',
            label: '抗炎治疗后,1个月复查'
        },
        {
            value: '4',
            label: '无需抗炎,一个月后复查'
        },
        {
            value: '5',
            label: '诊断性平扫CT（薄层）进一步检查增强CT（薄层）进一步检查'
        },
        {
            value: '6',
            label: 'PET-CT进一步检查'
        },
        {
            value: '7',
            label: '活检'
        },
        {
            value: '8',
            label: '临床门诊就诊'
        },
        {
            value: '9',
            label: '其他'
        },
    ],
    natures: [{
            value: '1',
            label: '良性'
        },
        {
            value: '2',
            label: '良性可能大'
        },
        {
            value: '3',
            label: '不能定性'
        },
        {
            value: '4',
            label: '恶性可能大'
        },
        {
            value: '5',
            label: '恶性'
        },
    ],
    levels: [{
            value: '1',
            label: '非常紧急(马上)'
        },
        {
            value: '2',
            label: '加急(一周内)'
        },
        {
            value: '3',
            label: '普通'
        },
    ],
    reasons: [{
            value: '1',
            label: '怀疑恶性'
        },
        {
            value: '2',
            label: '性质难判定'
        },
        {
            value: '3',
            label: '其他'
        },
    ],
    suggestion: [{
            value: '1',
            label: '年度复查'
        },
        {
            value: '2',
            label: '3个月复查'
        },
        {
            value: '3',
            label: '抗炎治疗后，1个月复查'
        }, {
            value: '4',
            label: '无需抗炎，1个月后复查'
        }, {
            value: '5',
            label: '诊断性平扫CT（薄层）进一步检查增强CT（薄层）进一步检查'
        }, {
            value: '6',
            label: 'PET-CT进一步检查'
        }, {
            value: '7',
            label: '活检'
        }, {
            value: '8',
            label: '临床门诊就诊'
        }, {
            value: '9',
            label: '其他'
        },
    ],
    // 气道病变类型
    QDtype: [{
            value: '1',
            label: '气道腔内结节'
        },
        {
            value: '2',
            label: '支气管壁增厚'
        },
        {
            value: '3',
            label: '“树芽征”样病灶'
        }, {
            value: '4',
            label: '支气管扩张'
        }, {
            value: '5',
            label: '弥漫性“马赛克”样改变'
        }, {
            value: '6',
            label: '粘液栓塞'
        }, {
            value: '7',
            label: '空气潴留（呼气性）'
        }, {
            value: '8',
            label: '其他'
        }
    ],
    // 气道病变位置
    position: [{
            value: '1',
            label: '右上叶'
        },
        {
            value: '2',
            label: '右中叶'
        },
        {
            value: '3',
            label: '右下叶'
        }, {
            value: '4',
            label: '左上叶'
        }, {
            value: '5',
            label: '左下叶'
        }
    ]

}

export default DICT