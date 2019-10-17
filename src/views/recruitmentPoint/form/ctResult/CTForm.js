
export default {
  methods: {
      //查看ct结果表单
       async getCTResultForm(id){
           const {data: {status, result}} = await this.$axios_http({
               url: '/base/ct/find/result/'+id
           })
           if (status === 'SUCCESS') {
               this.form = result
               if(this.form.item2A){
                   this.form.item2A = this.form.item2A.split(',')
               }else{
                   this.form.item2A = []
               }
               if(this.form.item3A){
                   this.form.item3A = this.form.item3A.split(',')
               }else{
                   this.form.item3A = []
               }
               if(this.form.item4A){
                   this.form.item4A = this.form.item4A.split(',')
               }else{
                   this.form.item4A = []
               }
               if(this.form.item5A){
                   this.form.item5A = this.form.item5A.split(',')
               }else{
                   this.form.item5A = []
               }
               if(this.form.item6A){
                   this.form.item6A = this.form.item6A.split(',')
               }else{
                   this.form.item6A = []
               }
               if (this.form.item9AA) {
                    this.form.item9AA = this.form.item9AA.split(',')
                } else {
                    this.form.item9AA = []
                }
                if (this.form.item9BA) {
                    this.form.item9BA = this.form.item9BA.split(',')
                } else {
                    this.form.item9BA = []
                }
               if(this.form.item14A){
                   this.form.item14A = this.form.item14A.split(',')
               }else{
                   this.form.item14A = []
               }
               if(this.form.item9EA){
                this.form.item9EA = this.form.item9EA.split(',')
                }else{
                    this.form.item9EA = []
                }
                if(this.form.item7C1){
                    this.form.item7C1 = this.form.item7C1.split(',')
                    }else{
                        this.form.item7C1 = []
                    }
           }
      },
      //查看ct结节表单
      async getCTTubercleForm(id){
          const {data: {status, result}} = await this.$axios_http({
              url: '/base/ct/find/tubercle/'+id
          })
          if (status === 'SUCCESS') {
              this.form = result
              if(this.form.item6){
                  this.form.item6 = this.form.item6.split(',')
              }else {
                  this.form.item6 = []
              }
              if(this.form.meetingTubercle){
                  this.form.meetingTubercle = this.form.meetingTubercle.split(',')
              }else {
                  this.form.meetingTubercle = []
              }
              if(!this.form.hosCtTubercleInfoPOS){
                this.form.hosCtTubercleInfoPOS =[]
              }
              this.checkTime = this.form.checkTime
          }
      },
      //查看c报告
      async getCTReport(id){
          const {data: {status, result}} = await this.$axios_http({
              url: '/base/ct/find/report/'+id
          })
          if (status === 'SUCCESS') {
              this.form = result
              this.checkDate = this.form.checkDate
              this.reportDate = this.form.reportDate

          }
      },
      //查看肠镜结果
      async getEnteroscopyForm(id){
          const {data: {status, result}} = await this.$axios_http({
              url: '/base/cj/find/result/'+id
          })
          if (status === 'SUCCESS') {
              let obj = result
              obj.item36 = []
              this.form = obj
              if(this.form.item361 == 1){
                  this.form.item36.push('1')
              }
              if(this.form.item362 == 1){
                  this.form.item36.push('2')
              }
              if(this.form.item363 == 1){
                  this.form.item36.push('3')
              }
              if(this.form.item364 == 1){
                  this.form.item36.push('4')
              }
              this.form.hosCjLesionsRecordInfoPOList.filter(item=>{
                  if(item.item1){
                    item.item1+=''
                  }
              })
              console.log(this.form.item36)
              if(this.form.checkDate){
                   this.checkDate = new Date(this.form.checkDate)
              }
             
          }
      },
      //查看病理结果
      async getPathologyForm(id){
          const {data: {status, result}} = await this.$axios_http({
              url: '/base/cj/find/cjPathologyResult/'+id
          })
          if (status === 'SUCCESS') {
              this.form = result
              if(this.form.pathologyDiagnosisRecordPOList){
                  this.form.pathologyDiagnosisRecordPOList.filter(item=>{
                      item.item2 += ''
                      item.item4 = item.item4.split(',')
                  })
              }
              console.log(this.form.pathologyDiagnosisRecordPOList)
              this.checkDate = this.form.checkDate
          }
      },
      //查看肠镜结果报告
      async getEnteroscopyReport(id){
          const {data: {status, result}} = await this.$axios_http({
              url: '/base/cj/find/cjReportResult/'+id
          })
          if (status === 'SUCCESS') {
              this.form = result
              this.checkDate = this.form.checkDate
              this.reportDate = this.form.reportDate
          }
      },
  }
}