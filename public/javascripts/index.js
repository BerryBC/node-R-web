$(() => {

	$('#btnUpload').click(function (e) {
		e.preventDefault();

		var formData = new FormData();
		var fileCSV = $('#fileUpload')[0].files[0];

		if ($('#fileUpload')[0].files.length > 0) {
			$('#btnUpload').attr('disabled', 'true');

			var objPara = {};
			formData.append('at', $("input[name='AT']:checked").val());
			formData.append(fileCSV.name, fileCSV);

			var jPara = $("[name='" + $("input[name='AT']:checked").val() + "']");

			if (jPara.length > 0) {
				for (let intI = 0; intI < jPara.length; intI++) {
					const elePara = jPara[intI];
					objPara[elePara.className] = elePara.value;
				};
				console.log(objPara);
				
			};
			formData.append('para',JSON.stringify( objPara));
			$.ajax({
				url: "./uploadcsv",
				type: "POST",
				dataType: "json",
				data: formData,
				contentType: false,
				processData: false,
				success: function (data) {
					$('#divOutputPic').html("");
					if (data.message == "Done") {
						$('#taResult').text(data.re.wd);
						if (data.re.pic) {
							var imgOutput = $("<img></img>");
							imgOutput[0].src = './tmpPNG/' + data.re.pic;
							
							$('#divOutputPic').append(imgOutput);
						};
						console.log("Done,and : Nothing");
					} else {
						$('#taResult').text('失败，理由为：' + data.re);
						console.log("Not done : " + data.re);
					}
					$('#btnUpload').attr('disabled', false);
				},
				error: function (err) {
					$('#divOutputPic').html("");
					$('#taResult').text('网络原因问题，主要原因为:[秘密]');
					console.log(err);
					$('#btnUpload').attr('disabled', false);
				}
			});
		} else {
			console.log('还没上传文件');
		};
	});

})