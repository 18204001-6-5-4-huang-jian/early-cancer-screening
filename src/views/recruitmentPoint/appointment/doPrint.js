import { getLodop } from '@/plugin/lodop' //这块就是引用的上面一大坨暴露出来的方法喽
//参考网站 http://www.lodop.net/LodopDemo.html
const PrintAccount = (name, cancerType, BarCodeValue) => {
    // 调用打印对象
    LODOP = getLodop()
    // 打印页面配置
    LODOP.SET_PRINT_MODE('PRINT_NOCOLLATE', 1)
    LODOP.SET_PRINT_PAGESIZE(3, '7.6cm', '5cm', 2)

    // 条码内容
    LODOP.ADD_PRINT_TEXT(5, 78, 200, 20, name)
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
    LODOP.ADD_PRINT_TEXT(22, 78, 200, 20, cancerType)
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
    LODOP.ADD_PRINT_BARCODE(42,60,173,60, '128C', BarCodeValue)
    
    LODOP.SET_PRINTER_INDEXA('ZDesigner GK888t')   //设置打印机
    // LODOP.PREVIEW()
    LODOP.PRINT();
}

export { PrintAccount }