//console.log('start');

(function(){
    FindNextPage.init();


})();

var FindNextPage = { 

    // search pattern
    _grep = /Next|下一页|下页|后页|^>>$/ig,

    // count press time
    _countPressTime = 0;

    keyCode = {
        bracket : ']'
    }

    init : function () { 
        this.bindEvent();
    },

    setGrep : function (grep) {
        // grep must be a RepExp Object
        if ('undefined' === typeof grep && !!grep && grep instanceof RegExp) {
            this._grep = grep;
        }
        else {
            return false;
        }
    },

    bindEvent : function () {
        // shortcut
        var count = this._countPressTime;

        // Bind document keydown event
        // Double press ']' then redirect to the next page
        document.addEventListener('keydown', function(e){
            // press ']' first and then press another key
            if(this.keyCode.bracket != e.keyCode && count > 0)
                count = 0;

            if(this.keyCode.bracket === e.keyCode) {
                if (0 == count) {
                    count++; // press ']' at first time
                }
                else if (1 == count) { 
                    this.goToNextPage(); // double press ']'
                }
                else {
                    count = 0; // reset
                }

                return false;
            }
        });
    },

    goToNextPage : function () {
        // url  : next page URL
        // links: all links , TAG <a>
        var url, links = document.getElementsByTagName('a');

        // has no link
        if (0 === links.lenght) return false; 

        for (a in links) {
            if (!! links[a].innerHTML && -1 != links[a].innerHTML.search(this._grep) ) {

                //console.log('FIND', links[a], links[a].getAttribute('href') );

                // Next page URL
                url = links[a].getAttribute('href');
                url = this.parserURL(url);

                // redirect to next page
                location.href = url;
            }
        }
    },

    parserURL : function (url) {

        // HANDLE: start with '/', LIKE:'/path/to'
        if ('/' === url.charAt(url.length -1)
        url = url.slice(0, -1);

        // HANDLE: not start with 'http://'
        if (0 != url.indexOf('http://'))
        url =  'http://' + document.domain + '/' +  url;

        return url;
    }
}

