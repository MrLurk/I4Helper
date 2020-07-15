$.getJSONP = function(url,/*optional */ data, callback) {
	$.ajax({
		url: url,
		data: data,
		success:callback,
		dataType: "jsonp"
	});
};
