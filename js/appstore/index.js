/***列表部分***/
function getScrollTop() {
	var scrollTop = 0,
		bodyScrollTop = 0,
		documentScrollTop = 0;
	if (document.body) {
		bodyScrollTop = document.body.scrollTop;
	}
	if (document.documentElement) {
		documentScrollTop = document.documentElement.scrollTop;
	}
	scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	return scrollTop;
}
//文档的总高度
function getScrollHeight() {
	var scrollHeight = 0,
		bodyScrollHeight = 0,
		documentScrollHeight = 0;
	if (document.body) {
		bodyScrollHeight = document.body.scrollHeight;
	}
	if (document.documentElement) {
		documentScrollHeight = document.documentElement.scrollHeight;
	}
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	return scrollHeight;
}

function getWindowHeight() {
	var windowHeight = 0;
	if (document.compatMode == "CSS1Compat") {
		windowHeight = document.documentElement.clientHeight;
	} else {
		windowHeight = document.body.clientHeight;
	}
	return windowHeight;
}



var index = 0;
var loadOk = false;
var swiper = new Swiper('.swiper-container', {
	loop: true,
	pagination: {
		el: '.swiper-pagination',
	},
	autoplay: true
});

$(function() {
	$(".close").on("click", function() {
		$('.toInstall').hide();
	});
	var listHight = $('.app-list').height();
	if (listHight == 0) {
		/* 第一次数据加载设置 .footer 高度为10000，延迟加载数据 */
		$('.footer').height(10000);
	}
	getAppListData(1, "loadList");
});

//jquery
$(window).scroll(function() {
	var scrollTop = $(this).scrollTop();
	var scrollHeight = $(document).height();
	var windowHeight = $(this).height();
	if (scrollTop + windowHeight >= scrollHeight - 5) {
		index++;
		getAppListData(index, "loadList");
	}
});
