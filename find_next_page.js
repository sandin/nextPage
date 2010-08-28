console.log('start');

(function(){

var grep = /Next|下一页|下页|后页|^>>$/ig;

var count221 = 0;

document.addEventListener('keydown', function(e){
    // 如果不是连续双击,则不转入
    if(221 != e.keyCode && count221 > 0) count221 = 0;

	if(e.keyCode == 221) {
        // 连续按下 ]] 转入下一页
        if (count221 < 1) count221++;
        else if (count221 = 1) goToNextPage(grep);
        else count221 = 0; // 双击后清零

        // 取消浏览器默认行为
		return false;
	}
});

function goToNextPage(grep) {
    var links = document.getElementsByTagName('a');
    if (0 == links.lenght) return false; 
    for (a in links) {
        if (!! links[a].innerHTML) {
            //console.log( links[a].innerHTML );
            //console.log( links[a].innerHTML.search(/a/ig) );
            if (-1 != links[a].innerHTML.search(grep)) {

                console.log('FIND', links[a], links[a].getAttribute('href') );
                var url = links[a].getAttribute('href');

                // 添加域名
                if (0 != url.indexOf('http://')) {
                    url =  'http://' + document.domain + '/' +  url;
                    console.log(url);
                }

                // 重定向
                location.href = url;
            }
        }//ifend
    }//forend
}//end of function

})();
