
var path = require('path');
var fs = require('fs');

var rio = require("rio");



function handleR(objHandle, resFB) {
	var strType = objHandle.at;
	var strOutput = path.join(__dirname, "../tmpCSV/sink-" + objHandle.csv.replace(/\\/g, "/").split('/').pop() + '.txt').replace(/\\/g, "/");
	var strPNG = path.join(__dirname, "../public/tmpPNG/sink-" + objHandle.csv.replace(/\\/g, "/").split('/').pop() + '.png').replace(/\\/g, "/");
	var objParaForR = { "df": objHandle.csv.replace(/\\/g, "/"), "ds": strOutput, "dp": strPNG,"para":objHandle.para }
	// console.log(objParaForR);
	switch (strType) {
		case 'wf':
			rio.e({
				filename: path.join(__dirname, "RScript/wf.r"),
				entrypoint: "funWF",
				data: objParaForR,
				callback: funResAfterE
			});
			break;
		case 'lm':
			rio.e({
				filename: path.join(__dirname, "RScript/lm.r"),
				entrypoint: "funLM",
				data: objParaForR,
				callback: funResAfterE
			});
			break;
			case 'glm':
			rio.e({
				filename: path.join(__dirname, "RScript/glm.r"),
				entrypoint: "funGLM",
				data: objParaForR,
				callback: funResAfterE
			});
			break;
			case 'ctree':
			rio.e({
				filename: path.join(__dirname, "RScript/ctree.r"),
				entrypoint: "funCTREE",
				data: objParaForR,
				callback: funResAfterE
			});
			break;
			case 'chisq':
			rio.e({
				filename: path.join(__dirname, "RScript/chisq.r"),
				entrypoint: "funCSQ",
				data: objParaForR,
				callback: funResAfterE
			});
			break;
			case 'hclust':
			rio.e({
				filename: path.join(__dirname, "RScript/hclust.r"),
				entrypoint: "funHC",
				data: objParaForR,
				callback: funResAfterE
			});
			break;
		default:
			break;
	};
	function funResAfterE(err, res) {
		// console.log(res);
		var objFB = {};
		if (!err) {
			var resHP = JSON.parse(res);
			var objResult = { wd: fs.readFileSync(strOutput).toString() };
			// console.log(objResult.wd);
			var strPNGRe = strPNG.split('/').pop();

			objFB.message = 'Done';
			objResult.pic = '';
			if (resHP.pic) {
				objResult.pic = strPNGRe;
			}
			objFB.re = objResult;
		} else {
			// console.log('err : ' + err);
			objFB.message = 'Err';
			objFB.re = err.toString();
		}
		resFB.send(objFB);
	}
};

module.exports = handleR; 
