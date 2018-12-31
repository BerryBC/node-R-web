var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
	  titleUp: 'R语言简便使用' ,
	  titleH1:'上传数据表格让R语言为你稍微处理一下',
	  introduction:'我是介绍：<br>烦请上传CSV文件，其中如果是回归的话，<strong>第一列</strong>代表<strong>因变量</strong>，后面可以放几列<strong>自变量</strong>。<br><strong>文件名不能有中文！</strong><br>文件内容也最好不能有中文，如果有，也麻烦请按照UTF-8编码，结果可以显示中文但图片显示不出。'
	});
});

module.exports = router; 
