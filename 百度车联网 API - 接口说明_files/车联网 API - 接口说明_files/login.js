/**
 *  用户登录组件
 *  @param {JsonObject} ops json对象参数
 */
window.tag = 0;
var M = {};

M.service = {};
function showUserInfo(data){
	if(data.errno == 0){
		 if (data.uname.length > 15) {
			data.uname = data.uname.replace(data.uname.substring(1, data.uname.length - 10), '...');
		 }

		 $("#userName").html(data.uname);
		 $("#user-state-li").show();
		 $("#login-reg-li").hide();
		 $("#logout").attr('href', "http://passport.baidu.com/?logout&u=" + location.href );
	}else{
		$("#user-state-li").hide();
		$("#login-reg-li").show();
		$("#login").attr('href', "https://passport.baidu.com/?login&u=" + location.href);
        $("#register").attr('href', "https://passport.baidu.com/v2/?reg&regType=1&tpl=mn&u=" + location.href);
	}
}
M.service.login = function(ops) {
    var backurl = ops.backurl; // 登录退出后的跳转地址 [必须输入项]
    var echo = ops.echo; // 回调函数→script加载完被调用
    var charset = ops.charset; // 编码
    var flag = ops.flag; // 是否启用缓存 默认不缓存
    var callback = ops.callback; // 回调函数→在_getUserState方法中被调用

    M.service.login._config["backurl"] = backurl;
    M.service.login._config["callback"] = callback;
    //M.service.login._setHtml("s",null);
    var url = M.service.login._config["ACCESS"];
    
	var script = document.createElement('script');
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}
M.service.login._config = {
    ACCESS: "http://api.map.baidu.com/portal/passport/session?callback=showUserInfo", // 取用户信息
    LOGIN: "https://passport.baidu.com/?login&u=" + location.href, // 登录passport地址
    SPLIT: "&nbsp;|&nbsp;" // 链接项目的分隔符
}

// 登录组件加载
$(document).ready(function() {
    var backurl = location.href;
    backurl = backurl.replace(/[<>]/g, function(match, pos, originalText) {
        switch (match) {
            case "<":
                return '&lt;';
                break;
            case ">":
                return '&gt;';
                break;
            case "&":
                return '&amp;';
                break;
            case "\"":
                return '&quot;';
                break;
        }
    });
    M.service.login({
        backurl: backurl, // *退出【登录】后的访问地址
        callback: function(o) {}
    });

	$('#user-state-li').bind({
			"mouseenter": function(e) {                    
				$('.username-dropdown').css('visibility', 'visible');
			},
			"mouseleave": function(e) {
				
				$('.username-dropdown').css('visibility', 'hidden');
			}
	});

});