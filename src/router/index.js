import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/Index');
const AuthRedirect = _import('login/Authredirect');
const CheckProject = _import('login/CheckProject');
const UpdatePassword = _import('login/UpdatePassword');
// 招募点
const Index = _import('recruitmentPoint/Index');
// const EvaluationReport=_import('recruitmentPoint/form/evaluation/EvaluationReport');
const EvaluationReportEntry=_import('recruitmentPoint/form/evaluation/entry');
const EvaluationReportLook=_import('recruitmentPoint/form/evaluation/EvaluationReportLook');
const Task = _import('recruitmentPoint/task/Task');
const AddTask = _import('recruitmentPoint/task/AddTask');
const AddUser = _import('recruitmentPoint/task/AddUser');
const UserList = _import('recruitmentPoint/task/UserList');
const EvaluationManagement=_import('recruitmentPoint/evaluation/EvaluationManagement');
const EvaluationResult=_import('recruitmentPoint/evaluation/EvaluationResult');
const Appointment=_import('recruitmentPoint/appointment/Appointment');
const AppointXQ=_import('recruitmentPoint/appointment/AppointXQ');
const Addappoint=_import('recruitmentPoint/appointment/Addappoint');
const AppointAll=_import('recruitmentPoint/appointment/AppointAll');
const Guidelines=_import('recruitmentPoint/appointment/Guidelines');
const SubjectList=_import('recruitmentPoint/appointment/SubjectList');
// const Statistics=_import('recruitmentPoint/statistics/Index');
// const StatistiChild=_import('recruitmentPoint/statistics/Statistics');
const QualityControl=_import('recruitmentPoint/qualityControl/QualityControl');
const Fitadd=_import('recruitmentPoint/fit/Index');
const HBsAgadd=_import('recruitmentPoint/HBsAg/Index');
const Hpadd=_import('recruitmentPoint/Hp/Index');
const Dna = _import('recruitmentPoint/dna/Index');
const DnaEntry = _import('recruitmentPoint/dna/DnaEntry');
// 用户管理
const UserIndex=_import('recruitmentPoint/users/Index');
const Adduser=_import('recruitmentPoint/users/Adduser');
const AgencyList=_import('recruitmentPoint/users/AgencyList');
const AgencyAdd=_import('recruitmentPoint/users/AgencyAdd');
const AgencyDetail=_import('recruitmentPoint/users/AgencyDetail');
// 招募点预约
const RecruitList=_import('recruitmentPoint/appointment/RecruitList');
// 地区预约
const AreaList=_import('recruitmentPoint/appointment/AreaList');
const AppointDetail=_import('recruitmentPoint/appointment/AppointDetail');
// 放号管理
const Management=_import('recruitmentPoint/releaseNumber/Manage');
const Organize=_import('recruitmentPoint/releaseNumber/Organize');
const AddNumber=_import('recruitmentPoint/releaseNumber/AddNumber');
const AddOrganize=_import('recruitmentPoint/releaseNumber/AddOrganize');
// 筛查端 预约汇总
const Bookcollect = _import('recruitmentPoint/bookcollect/bookcollect');
// 招募端 预约汇总
const RecruitmentBookcollect = _import('recruitmentPoint/bookcollect/recruitmentbookcollect');
// 招募端 筛查汇总
const zmScreeningCollect=_import('recruitmentPoint/screeningCollect/screeningCollectList');
const zmScreeningCollectView=_import('recruitmentPoint/screeningCollect/reportView');
//ct结节表单
const Noduleentry=_import('recruitmentPoint/form/nodule/NoduleEntry');
const Nodulelook=_import('recruitmentPoint/form/nodule/NoduleLook');
//ct结果表单
const Resultentry=_import('recruitmentPoint/form/ctResult/ResultEntry');
//ct结果表单查看
const Resultlook=_import('recruitmentPoint/form/ctResult/ResultLook');
//ct结报告表单
const Resultreport=_import('recruitmentPoint/form/ctResult/ResultReport');
//ct结报告表单查看
const Reportlook=_import('recruitmentPoint/form/nodule/ReportLook');
//肠镜结果表单
const Enteroscopyentry=_import('recruitmentPoint/form/enteroscopy/EnteroscopyEntry');
//肠镜结果表单查看
const Enteroscopylook=_import('recruitmentPoint/form/enteroscopy/EnteroscopyLook');
//肠镜报告
const Enteroscopyreport=_import('recruitmentPoint/form/enteroscopy/EnteroscopyReport');
//肠镜结果报告查看
const Enteroscopyreportlook=_import('recruitmentPoint/form/enteroscopy/EnteroscopyReportLook');
//病理表单
const Pathologyentry=_import('recruitmentPoint/form/pathology/PathologyEntry');
//病理表单查看
const Pathologylook=_import('recruitmentPoint/form/pathology/PathologyLook');
//病理报告
const Pathologyreport=_import('recruitmentPoint/form/pathology/PathologyReport');

// CT表单新
const ct=_import('recruitmentPoint/form/ct/Index');
const CTReportZZ = _import('recruitmentPoint/form/ctReport/Index');


// 肝癌
const LiverEntry=_import('recruitmentPoint/form/liver/LiverEntry');
// 肝癌查看
const LiverLook=_import('recruitmentPoint/form/liver/LiverLook');
// 肝癌报告
const LiverReport=_import('recruitmentPoint/form/liver/LiverReport');
// 乳腺癌-X线
const MammaryXLine=_import('recruitmentPoint/form/xline/MammaryXLine');
// 乳腺癌-X线查看
const MammaryLook = _import('recruitmentPoint/form/xline/MammaryLook');
// 乳腺X线-报告
const XLineReport=_import('recruitmentPoint/form/xline/XLineReport');
// 乳腺癌-超声
const MammaryUltrasound=_import('recruitmentPoint/form/sound/MammaryUltrasound');
// 乳腺癌-超声查看
const MSoundLook=_import('recruitmentPoint/form/sound/MSoundLook');
// 乳腺超声-报告
const MSoundReport=_import('recruitmentPoint/form/sound/MSoundReport');
// 上消化道录入
const DigestiveEntry=_import('recruitmentPoint/form/digestive/DigestiveEntry');
// 上消化道查看
const DigestiveLook=_import('recruitmentPoint/form/digestive/DigestiveLook');
// 上消化道报告
const DigestiveReport=_import('recruitmentPoint/form/digestive/DigestiveReport');
// 上消化道病理录入
const DigestiveBlEntry=_import('recruitmentPoint/form/digestiveBI/DigestiveBlEntry');
// 上消化道病理查看
const DigestiveBlLook=_import('recruitmentPoint/form/digestiveBI/DigestiveBlLook');
// 上消化道病理报告
const DigestiveBlReport=_import('recruitmentPoint/form/digestiveBI/DigestiveBlReport');

// 快递信息
const Express=_import('recruitmentPoint/biology/Express');
const ExpressDetail=_import('recruitmentPoint/biology/ExpressDetail');
const SendExpress=_import('recruitmentPoint/biology/SendExpress');

// const GJUserList = _import('gjTask/GJUserList');
// 国家
const GJIndex = _import('gj/Index');
const GJTask = _import('gj/task/GJTask');
const GJAddTask = _import('gj/task/GJAddTask');
const GJAddUser = _import('gj/task/GJAddUser');
const GJSamplesIndex=_import('gj/samples/Index');
const GJSubjectIndex=_import('gj/subject/Index');
const GJSubjectDetail=_import('gj/subject/SubjectDetail');
// 管理机构
const GljgIndex = _import('gljg/Index');
const GljgTask = _import('gljg/task/Task');
const GljgAddTask = _import('gljg/task/AddTask');
const GljgAddUser = _import('gljg/task/AddUser');
const GljgUserList = _import('gljg/task/UserList');
// 筛查机构
const agencyIndex=_import('screeningAgency/Index');
const agencyTask=_import('screeningAgency/task/Task');
const samplesIndex=_import('screeningAgency/samples/Index');
const LiverList=_import('screeningAgency/cancers/liver/LiverList');
const DigestiveList=_import('screeningAgency/cancers/digestive/DigestiveList');
// 血液结果 （重庆）
const BloodResult = _import('screeningAgency/cancers/bloodResult/bloodResultList');
const BloodResultInput = _import('screeningAgency/cancers/bloodResult/bloodResultInput');

// 筛查汇总（筛查端）
const screeningCollect = _import('screeningAgency/cancers/screeningCollect/screeningCollectList');
const screeningCollectView = _import('screeningAgency/cancers/screeningCollect/reportView');

const LungList=_import('screeningAgency/cancers/lung/LungList');
const ColorectalList=_import('screeningAgency/cancers/colorecta/ColorectalList');
const MammaryList = _import('screeningAgency/cancers/mammary/MammaryList');
const MammarySound = _import('screeningAgency/cancers/mammarysound/MammaryList');
const AgencySubjectIndex = _import('screeningAgency/subject/Index');
const AgencySubjectDetail = _import('screeningAgency/subject/SubjectDetail');
// 帮助中心
const Help = _import('help/Help');
// 招募点统计
const List=_import('recruitmentPoint/statistics/List');
const SubList=_import('recruitmentPoint/statistics/SubList');
// 筛查机构统计
const scList=_import('screeningAgency/statistics/List');
const scSubList=_import('screeningAgency/statistics/SubList');
const scThrList=_import('screeningAgency/statistics/ThrList');
// 管理机构统计
const GList=_import('gljg/statistics/List');
const GSubList=_import('gljg/statistics/SubList');
const ThrList=_import('gljg/statistics/ThrList');
// 国家统计
const GJList=_import('gj/statistics/List');
const GJSubList=_import('gj/statistics/SubList');
const GJThrList=_import('gj/statistics/ThrList');
//随访
const Follow = _import('recruitmentPoint/follow/Index');
const FollowEntry = _import('followUp/FollowEntry');
const FollowIndex = _import('followUp/Index');

/**
 * 肺肠表单
 */
// 资格入组表单
// const Qualification = _import('ldctForm/qualification/Index');
// 个人信息报表
const PersonInfo = _import('ldctForm/personInfo/Index');


// 危险因素调查表
const RiskFactor = _import('ldctForm/riskFactors/index');
// 肺肠CT结果表
const CT = _import('ldctForm/ct/Index');
const CTReport = _import('ldctForm/ctReport/Index');

// 招募机构 受试者列表
const Zmjg = _import('zmjg/subject/Index')

Vue.use(Router);

export const constantRouterMap = [
  // {path: '/login', component: Login, hidden: true},
  // {path: '/authredirect', component: AuthRedirect, hidden: true},
  // {path: '/checkproject', component: CheckProject,name: '项目概况', hidden: true,meta: {requireAuth: 'recruitmentpoint-index-page'}},
  // {path:'/UpdatePassword',component: UpdatePassword,name: '修改密码'},
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/home',
    component: Layout,
    name: '项目概况',
    meta: {requireAuth: 'recruitmentpoint-index-page',breadNumber:1},
    children: [
      {path: 'home', component: Index,name: '项目概况', meta: {requireAuth: 'recruitmentpoint-home-page'}}
    ]
  },
  // {
  //   path: '/checkproject',
  //   component: Layout,
  //   name: '选择机构',
  //   hidden: true,
  //   children: [
  //     {path: 'index', component: CheckProject,name: '选择机构', meta: {requireAuth: 'recruitmentpoint-checkproject-page'}},
  //   ]
  // },

  // 招募点
  {
    path: '/recruitmentpoint',
    component: Layout,
    redirect: '/',
    name: '项目概况',
    meta:{breadNumber:1},
    children: [
      {path: 'index', component: Index,name: '项目概况', meta: {requireAuth: 'recruitmentpoint-index-page'}}
    ]
  },
  {
    path: '/task',
    component: Layout,
    name: '任务管理',
    meta:{breadNumber:1},
    redirect: '/task/index',
    children: [
      {path: 'index', component: Task,name: '任务分配', meta: {requireAuth: 'recruitmentpoint-taskindex-page'}},
      {path: 'addtask', component: AddTask,name: '添加任务', meta: {requireAuth: 'recruitmentpoint-addtask-page',breadNumber:3}},
      {path: 'adduser', component: AddUser,name: '添加用户', meta: {requireAuth: 'recruitmentpoint-adduser-page',breadNumber:3}},
      {path: 'userlist', component: UserList,name: '用户列表', meta: {requireAuth: 'recruitmentpoint-userlist-page',breadNumber:3}},
    ]
  },
  {
    path: '/evaluation',
    component: Layout,
    name: '评估管理',
    meta:{breadNumber:1},
    redirect: '/evaluation/index',
    children: [
      {path: 'index', component: EvaluationManagement,name: '评估列表', meta: {requireAuth: 'recruitmentpoint-evaluation-page'}},
      {path: 'evaluationreport', component: EvaluationReportEntry,name: '问卷记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page',breadNumber:3}},
      {path: 'evaluationresult', component: EvaluationResult,name: '查看详情', meta: {requireAuth: 'recruitmentpoint-evaluationresult-page',breadNumber:3}},
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    name: '数据统计',
    meta:{breadNumber:1},
    hidden: true,
    children: [
      // 招募点
      {path: 'list', component: List,name: '任务统计', meta: {requireAuth: 'recruitmentpoint-statistics-list-page'}},
      {path: 'sublist', component: SubList,name: '任务统计下钻', meta: {requireAuth: 'recruitmentpoint-statistics-sublist-page',breadNumber:3}},
      // 筛查机构
      {path: 'sclist', component: scList,name: '任务统计', meta: {requireAuth: 'recruitmentpoint-statistics-sclist-page'}},
      {path: 'scsublist', component: scSubList,name: '任务统计下钻', meta: {requireAuth: 'recruitmentpoint-statistics-scsublist-page',breadNumber:3}},
      {path: 'scthrlist', component: scThrList,name: '任务统计下钻', meta: {requireAuth: 'recruitmentpoint-statistics-scthrlist-page',breadNumber:3}},
      // 管理机构
      {path: 'glist', component: GList,name: '任务统计', meta: {requireAuth: 'recruitmentpoint-statistics-glist-page'}},
      {path: 'gsublist', component: GSubList,name: '任务统计下钻', meta: {requireAuth: 'recruitmentpoint-statistics-gsublist-page',breadNumber:3}},
      {path: 'gthrlist', component: ThrList,name: '任务统计下钻', meta: {requireAuth: 'recruitmentpoint-statistics-gthrlist-page',breadNumber:3}},
      // 国家
      {path: 'gjlist', component: GJList,name: '任务统计', meta: {requireAuth: 'recruitmentpoint-statistics-gjlist-page'}},
      {path: 'gjsublist', component: GJSubList,name: '任务统计下钻', meta: {requireAuth: 'recruitmentpoint-statistics-gjsublist-page',breadNumber:3}},
      {path: 'gjthrlist', component: GJThrList,name: '任务统计下钻', meta: {requireAuth: 'recruitmentpoint-statistics-gjthrlist-page',breadNumber:3}},
    ]
  },
  //  随诊
  {
      path: '/follow',
      component: Layout,
      name: '随诊管理',
      meta:{breadNumber:1},
      hidden: true,
      children:[
       {path:'index',component:Follow,name:'随诊管理',meta: {requireAuth: 'follow-page'}}
      ]
  },
  // 随访
  {
    path: '/followup',
    component: Layout,
    name: '随访管理',
    meta:{breadNumber:1},
    hidden: true,
    children:[
     {path:'followentry',component:FollowEntry,name:'阳性随访表',meta: {requireAuth: 'followentry-page',breadNumber:3}},
     {path:'index',component:FollowIndex,name:'随访列表',meta: {requireAuth: 'followindex-page'}}
    ]
},
  {
    path: '/qualitycontrol',
    component: Layout,
    name: '评估审核',
    meta:{breadNumber:1},
    redirect: '/qualitycontrol/index',
    children: [
      {path: 'index', component: QualityControl,name: '评估审核', meta: {requireAuth: 'recruitmentpoint-qualitycontrol-page'}},
    ]
  },
  // 招募端 筛查汇总
  {
    path: '/zmScreeningCollect',
    component: Layout,
    name: '筛查汇总',
    meta:{breadNumber:1},
    redirect: '/zmScreeningCollect/index',
    children: [
      {path: 'index', component: zmScreeningCollect,name: '筛查汇总列表', meta: {requireAuth: 'recruitmentpoint-zmScreeningCollect-page'}},
    ]
  },
  {
    path: '/appointment',
    component: Layout,
    name: '预约管理',
    meta:{breadNumber:1},
    redirect: '/appointment/manage',
    children: [
      {path: 'ct', component: Appointment,name: '低剂量CT预约', meta: {requireAuth: 'recruitmentpoint-ct-page'}},
      {path: 'enteroscopy', component: Appointment,name: '结直肠镜预约', meta: {requireAuth: 'recruitmentpoint-enteroscopy-page'}},
      {path: 'liver', component: Appointment,name: '肝癌三项预约', meta: {requireAuth: 'recruitmentpoint-fit-page'}},
      {path: 'ultrasonic', component: Appointment,name: '乳腺超声预约', meta: {requireAuth: 'recruitmentpoint-ultrasonic-page'}},
      {path: 'xline', component: Appointment,name: '乳腺X线预约', meta: {requireAuth: 'recruitmentpoint-xline-page'}},
      {path: 'digestive', component: Appointment,name: '上消内镜预约', meta: {requireAuth: 'recruitmentpoint-digestive-page'}},
      {path: 'addappoint', component: Addappoint,name: '预约详情', meta: {requireAuth: 'recruitmentpoint-addappoint-page',breadNumber:3}},
      {path: 'subjectlist', component: SubjectList,name: '受试者列表', meta: {requireAuth: 'recruitmentpoint-subjectlist-page',breadNumber:3}},
      {path: 'recruitlist', component: RecruitList,name: '招募点预约', meta: {requireAuth: 'recruitmentpoint-recruitlist-page'}},
      {path: 'arealist', component: AreaList,name: '筛查点预约', meta: {requireAuth: 'recruitmentpoint-arealist-page'}},
      {path: 'manage', component: Management,name: '放号管理', meta: {requireAuth: 'releasenumber-manage-page'}},
      {path: 'organize', component: Organize,name: '机构详情', meta: {requireAuth: 'releasenumber-organize-page',breadNumber:3}},
      {path: 'addnumber', component: AddNumber,name: '新增放号', meta: {requireAuth: 'releasenumber-addnumber-page',breadNumber:3}},
      {path: 'addorganize', component: AddOrganize,name: '新增机构', meta: {requireAuth: 'releasenumber-addorganize-page',breadNumber:3}},
      {path: 'appointdetail', component: AppointDetail,name: '预约详情', meta: {requireAuth: 'releasenumber-appointdetail-page',breadNumber:3}},
      {path: 'appointxq', component: AppointXQ,name: '预约详情', meta: {requireAuth: 'releasenumber-appointxq-page',breadNumber:3}},
      {path: 'appointall', component: AppointAll,name: '一键签到', meta: {requireAuth: 'recruitmentpoint-appointall-page'}},
      {path: 'guidelines', component: Guidelines,name: '指引单', meta: {requireAuth: 'releasenumber-guidelines-page',breadNumber:3}},
      // 筛查端 预约汇总
      {path: 'Bookcollect', component: Bookcollect,name: '预约汇总', meta: {requireAuth: 'recruitmentpoint-bookcollect-page'}},
      // 招募端 预约汇总
      {path: 'RecruitmentBookcollect', component: RecruitmentBookcollect,name: '预约汇总', meta: {requireAuth: 'recruitmentpoint-recruitmentbookcollect-page'}},
    ]
  },
  {
    path: '/fit',
    component: Layout,
    name: '结果录入',
    meta:{breadNumber:1},
    redirect: '/fit/index',
    children: [
      {path: 'index', component: Fitadd,name: 'FIT结果', meta: {requireAuth: 'recruitmentpoint-fitadd-page'}},
    ]
  },
  {
    path: '/hp',
    component: Layout,
    name: '结果录入',
    meta:{breadNumber:1},
    redirect: '/hp/index',
    children: [
      {path: 'index', component: Hpadd,name: 'Hp结果', meta: {requireAuth: 'recruitmentpoint-hp-page'}},
    ]
  },
  {
    path: '/hbsag',
    component: Layout,
    name: '结果录入',
    meta:{breadNumber:1},
    redirect: '/hbsag/index',
    children: [
      {path: 'index', component: HBsAgadd,name: 'HBsAg结果', meta: {requireAuth: 'recruitmentpoint-hbsag-page'}},
    ]
  },
  {
    path: '/dna',
    component: Layout,
    name: '结果录入',
    meta:{breadNumber:1},
    redirect: '/dna/index',
    children: [
      {path: 'index', component: Dna,name: '粪便DNA管理', meta: {requireAuth: 'recruitmentpoint-dna-page'}},
      {path: 'dnaentry', component: DnaEntry,name: '粪便DNA录入', meta: {requireAuth: 'recruitmentpoint-dnaentry-page',breadNumber:3}},
    ]
  },
   // 招募点-筛查机构用户管理
  {
    path: '/user',
    component: Layout,
    name: '系统管理',
    meta:{breadNumber:1},
    redirect: '/user/index',
    children: [
      {path: 'index', component: UserIndex,name: '用户管理', meta: {requireAuth: 'recruitmentpoint-userlist-page'}},
      {path: 'adduser', component: Adduser,name: '用户信息', meta: {requireAuth: 'recruitmentpoint-adduser-page',breadNumber:3}},
      {path: 'agency/list', component: AgencyList,name: '机构管理', meta: {requireAuth: 'recruitmentpoint-agencyindex-page'}},
      {path: 'agency/add', component: AgencyAdd,name: '新增机构', meta: {requireAuth: 'recruitmentpoint-agencyadd-page',breadNumber:3}},
      {path: 'agency/detail', component: AgencyDetail,name: '机构信息', meta: {requireAuth: 'recruitmentpoint-agencydetail-page',breadNumber:3}},
    ]
  },
  // 国家-管理机构用户管理
  {
    path: '/usergj',
    component: Layout,
    name: '系统管理',
    meta:{breadNumber:1},
    redirect: '/usergj/index',
    children: [
      {path: 'index', component: UserIndex,name: '用户管理', meta: {requireAuth: 'recruitmentpoint-usergjlist-page'}},
      {path: 'adduser', component: Adduser,name: '用户信息', meta: {requireAuth: 'recruitmentpoint-addusergj-page',breadNumber:3}},
    ]
  },
    {
        path: '/form',
        component: Layout,
        name: '表单',
        children: [
            //ct结节录入
            {path: 'noduleentry', component: Noduleentry,name: '结节记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            {path: 'nodulelook', component: Nodulelook,name: '结节记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            //ct结果录入
            {path: 'resultentry', component: Resultentry,name: '结果记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            {path: 'resultlook', component: Resultlook,name: '结果记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            {path: 'resultreport', component: Resultreport,name: '报告记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            {path: 'reportlook', component: Reportlook,name: '报告记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            //肠镜表单
            {path: 'enteroscopyentry', component: Enteroscopyentry,name: '结果记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            //肠镜表单查看
            {path: 'enteroscopylook', component: Enteroscopylook,name: '结果记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            //肠镜报告
            {path: 'enteroscopyreport', component: Enteroscopyreport,name: '结果报告记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            //肠镜报告查看
            {path: 'enteroscopyreportlook', component: Enteroscopyreportlook,name: '结果报告记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            //病理结果表单
            {path: 'pathologyentry', component: Pathologyentry,name: '病理记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            //病理结果表单查看
            {path: 'pathologylook', component: Pathologylook,name: '病理记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},
            //病理报告
            {path: 'pathologyreport', component: Pathologyreport,name: '病理报告记录', meta: {requireAuth: 'recruitmentpoint-evaluationreport-page'}},

            {path: 'liverentry', component: LiverEntry,name: '结果记录', meta: {requireAuth: 'recruitmentpoint-liverentry-page'}},
            {path: 'liverlook', component: LiverLook,name: '结果记录', meta: {requireAuth: 'recruitmentpoint-liverlook-page'}},
            {path: 'liverreport', component: LiverReport,name: '报告记录', meta: {requireAuth: 'recruitmentpoint-liverreport-page'}},

          //ct结果录入
          {path: 'mammaryxline', component: MammaryXLine,name: '结果记录', meta: {requireAuth: ''}},
          { path: 'mammarylook', component: MammaryLook, name: '结果记录', meta: { requireAuth: '' } },
          {path: 'xlinereport', component: XLineReport,name: '报告记录', meta: {requireAuth: ''}},
          // //ct结果录入
          {path: 'mammaryultrasound', component: MammaryUltrasound,name: '结果记录', meta: {requireAuth: ''}},
          {path: 'msoundlook', component: MSoundLook,name: '结果记录', meta: {requireAuth: ''}},
          {path: 'msoundreport', component: MSoundReport,name: '报告记录', meta: {requireAuth: ''}},
          {path: 'digestiveentry', component: DigestiveEntry,name: '结果记录', meta: {requireAuth: 'recruitmentpoint-digestiveentry-page'}},
          {path: 'digestivelook', component: DigestiveLook,name: '结果记录', meta: {requireAuth: 'recruitmentpoint-digestivelook-page'}},
          {path: 'digestivereport', component: DigestiveReport,name: '结果报告记录', meta: {requireAuth: 'recruitmentpoint-digestivereport-page'}},
          {path: 'digestivbl', component: DigestiveBlEntry,name: '病理记录', meta: {requireAuth: 'recruitmentpoint-digestivbl-page'}},
          {path: 'digestivblook', component: DigestiveBlLook,name: '病理记录', meta: {requireAuth: 'recruitmentpoint-digestivblook-page'}},
          {path: 'digestivbreport', component: DigestiveBlReport,name: '病理报告记录', meta: {requireAuth: 'recruitmentpoint-digestivbreport-page'}},
          // 查看问卷
          {path: 'evaluationlook', component: EvaluationReportLook,name: '查看详情', meta: {requireAuth: 'recruitmentpoint-evaluationlook-page'}},
          // 早诊-肺的新表单
          {path: 'ct', component: ct,name: '结果记录', meta: {requireAuth: 'recruitmentpoint-ct-page'}},
          {path: 'ctreport', component: CTReportZZ,name: '报告记录', meta: {requireAuth: 'recruitmentpoint-ct-report-page'}},
          {path: 'screeningCollectView', component: screeningCollectView,name: '报告查看', meta: {requireAuth: 'screeningCollectView-page'}},
          {path: 'zmScreeningCollectView', component: zmScreeningCollectView,name: '报告查看', meta: {requireAuth: 'zmScreeningCollectView-page'}},
        ]
    },
  // 筛查机构项目概况
  {
    path: '/agency',
    component: Layout,
    name: '项目概况',
    meta:{breadNumber:1},
    redirect: '/screenagency/index',
    children: [
      {path: 'index', component: agencyIndex,name: '项目概况', meta: {requireAuth: ''}},
    ]
  },
  //
  {
    path: '/agency',
    component: Layout,
    name: '样本管理',
    meta:{breadNumber:1},
    redirect: '/agency/samples/index',
    children: [
      {path: 'samples/index', component: samplesIndex,name: '生物样本', meta: {requireAuth: ''}},
      // {path: 'index', component: agencyIndex,name: '项目概况', meta: {requireAuth: ''}},
      {path: 'express', component: Express,name: '快递信息', meta: {requireAuth: 'recruitmentpoint-express-page'}},
      {path: 'expressdetail', component: ExpressDetail,name: '快递详情', meta: {requireAuth: 'recruitmentpoint-expressdetail-page',breadNumber:3}},
      {path: 'sendexpress', component: SendExpress,name: '寄出样本', meta: {requireAuth: 'recruitmentpoint-sendexpress-page',breadNumber:3}},
    ],
  },
  {
    path: '/agency/task',
    component: Layout,
    name: '任务管理',
    meta:{breadNumber:1},
    redirect: '/agency/task/index',
    children: [
      {path: 'index', component: agencyTask,name: '任务分配', meta: {requireAuth: ''}},
    ]
  },
  {
    path: '/agency',
    component: Layout,
    name: '受试者管理',
    meta:{breadNumber:1},
    redirect: '',
    children: [
      {path: 'subject/index', component: AgencySubjectIndex,name: '受试者列表', meta: {requireAuth: ''}},
      {path: 'subject/detail', component: AgencySubjectDetail,name: '受试者详情', meta: {requireAuth: '',breadNumber:3}},
    ]
  },

  // 国家
  {
    path: '/gj',
    component: Layout,
    name: '项目概况',
    hidden: true,
    meta:{breadNumber:1},
    redirect: '/gj/index',
    children: [
      {path: 'index', component: GJIndex,name: '项目概况', meta: {requireAuth: ''}},
    ]
  },
  {
    path: '/gj',
    component: Layout,
    name: '任务管理',
    hidden: true,
    meta:{breadNumber:1},
    redirect: '/gj/task/index',
    children: [
      {path: 'task/index', component: GJTask,name: '任务分配', meta: {requireAuth: ''}},
      {path: 'task/addtask', component: GJAddTask,name: '添加任务', meta: {requireAuth: '',breadNumber:3}},
      {path: 'task/adduser', component: GJAddUser,name: '添加机构', meta: {requireAuth: '',breadNumber:3}},
    ]
  },
  {
    path: '/gj',
    component: Layout,
    name: '样本管理',
    hidden: true,
    meta:{breadNumber:1},
    redirect: '/gj/samples/index',
    children: [
      // {path: 'index', component: GJIndex,name: '项目概况', meta: {requireAuth: ''}},
      // {path: 'task/index', component: GJTask,name: '任务分配', meta: {requireAuth: ''}},
      // {path: 'task/addtask', component: GJAddTask,name: '添加任务', meta: {requireAuth: ''}},
      // {path: 'task/adduser', component: GJAddUser,name: '添加用户', meta: {requireAuth: ''}},
      {path: 'samples/index', component: GJSamplesIndex,name: '生物样本', meta: {requireAuth: ''}},
      {path: 'express', component: Express,name: '快递信息', meta: {requireAuth: ''}},
      // {path: 'userlist', component: GJUserList,name: '用户列表', meta: {requireAuth: ''}}
    ]
  },
  // 国家受试者管理
  {
    path: '/subject',
    component: Layout,
    name: '受试者管理',
    meta:{breadNumber:1},
    redirect: '',
    children: [
      {path: 'index', component: GJSubjectIndex,name: '受试者列表', meta: {requireAuth: 'gj-subject-index-page'}},
      {path: 'detail', component: GJSubjectDetail,name: '受试者详情', meta: {requireAuth: 'gj-subject-detail-page',breadNumber:3}},
    ]
  },
  {
    path: '/zm',
    component: Layout,
    name: '受试者管理',
    meta:{breadNumber:1},
    redirect: '',
    children: [
      {path: 'subject/index', component: Zmjg,name: '受试者列表', meta: {requireAuth: ''}},
    ]
  },
  // 管理机构
  {
    path: '/gljg',
    component: Layout,
    name: '项目概况',
    meta:{breadNumber:1},
    redirect: '/gljg/index',
    children: [
      {path: 'index', component: GljgIndex,name: '项目概况', meta: {requireAuth: ''}},
    ]
  },
  {
    path: '/gljg',
    component: Layout,
    name: '任务管理',
    meta:{breadNumber:1},
    redirect: '/gljg/task/index',
    children: [
      // {path: 'index', component: GljgIndex,name: '项目概况', meta: {requireAuth: ''}},
      {path: 'task/index', component: GljgTask,name: '任务分配', meta: {requireAuth: ''}},
      {path: 'task/addtask', component: GljgAddTask,name: '添加任务', meta: {requireAuth: '',breadNumber:3}},
      {path: 'task/adduser', component: GljgAddUser,name: '添加用户', meta: {requireAuth: '',breadNumber:3}},
      {path: 'task/userlist', component: GljgUserList,name: '机构列表', meta: {requireAuth: '',breadNumber:3}},
    ]
  },
  // 癌症筛查
  {
    path: '/cancer',
    component: Layout,
    name: '筛查管理',
    meta:{breadNumber:1},
    redirect: '/cancer/lunglist',
    children: [
      {path: 'liverlist', component: LiverList,name: '肝癌三项', meta: {requireAuth: 'agency-liverlist-page'}},
      {path: 'mammary/list', component: MammaryList, name: '乳腺X线', meta: { requireAuth: 'agency-liverlist-page' } },
      {path: 'mammarysound/list', component: MammarySound, name: '乳腺超声', meta: { requireAuth: 'agency-liverlist-page' } },
      {path: 'digestivelist', component: DigestiveList,name: '上消内镜', meta: {requireAuth: 'agency-digestivelist-page'}},
      {path: 'lunglist', component: LungList,name: '低剂量CT', meta: {requireAuth: 'agency-lunglist-page'}},
      {path: 'colorectal/list', component: ColorectalList,name: '结直肠镜', meta: {requireAuth: 'agency-colorectal-page'}},
      {path: 'bloodResultList', component: BloodResult,name: '血液结果', meta: {requireAuth: 'bloodResult-page'}},
      {path: 'bloodResultInput', component: BloodResultInput,name: '血液结果录入', meta: {requireAuth: 'bloodResult-input-page'}},
      {path:'screeningCollect',component:screeningCollect,name: '筛查汇总', meta: {requireAuth: 'screeningCollect-page'}},
      {path: 'task/index', component: GljgTask,name: '任务分配', meta: {requireAuth: ''}},
      {path: 'task/addtask', component: GljgAddTask,name: '添加任务', meta: {requireAuth: ''}},
      {path: 'task/adduser', component: GljgAddUser,name: '添加用户', meta: {requireAuth: ''}},
      // {path: 'task/userlist', component: GljgUserList,name: '机构列表', meta: {requireAuth: ''}},
    ]
  },

  {
    path: '/help',
    component: Layout,
    name: '项目概况',
    meta: {requireAuth: '',breadNumber:1},
    children: [
      {path: 'index', component: Help,name: '帮助中心', meta: {requireAuth: 'recruitmentpoint-help-page'}}
    ]
  },
  // 肺癌表单
  {
    path: '/ldctform',
    component: Layout,
    name: '表单',
    children: [
        {path: 'personinfo/index', component: PersonInfo,name: '个人信息表', meta: {requireAuth: 'ldctform-personinfo-page'}},
        {path: 'riskfactor', component: RiskFactor,name: '危险因素调查表', meta: {requireAuth: 'ldctform-riskfactor-page'}},
        {path: 'ct/index', component: CT,name: '低剂量CT结果表', meta: {requireAuth: 'ldctform-ct-page'}},
        {path: 'ctreport/index', component: CTReport,name: '结果记录', meta: {requireAuth: 'ldctform-ctreport-page'}},
    ]
}
]
export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});

