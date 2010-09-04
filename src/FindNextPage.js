//console.log('start');
(function(){


// Namespace
window.Lds = {}


var FindNextPage = { 

    // version
    version : '1.0',

    // only for debuger
    DEBUG  : true,

    // search pattern
    _grep : /Next|下一页|下页|后页|^>>$/ig,

    // count press time
    _count : 0,

    // next page URL
    url : '',

    // keyCode Map
    keyCode : {
        // ']'
        bracket : 221
    },

    init : function () { 
        // bind All the event handler
        this.bindEvent();
        // save it to the namespace
        window.Lds.FindNextPage = this;
    },

    setGrep : function (grep) {
        // grep must be a RepExp Object
        if ('undefined' !== typeof grep && !!grep && grep instanceof RegExp) {
            this._grep = grep;
        }
        else {
            return false;
        }
    },

    bindEvent : function () {
        // shortcut
        var self  = this;

        // Bind document keydown event
        document.addEventListener('keydown', function(e){
            //if (this.DEBUG) console.log(e.keyCode);

            // Double press ']' then redirect to the next page
            if(self.keyCode.bracket != e.keyCode && self._count > 0)
                self._count = 0;

            if(self.keyCode.bracket === e.keyCode) {
                if (0 == self._count) {
                    self._count++; // press ']' at first time
                }
                else if (1 == self._count) { 
                    self.goToNextPage(); // double press ']'
                }
                else {
                    self._count = 0; // reset
                }
            }
        }, true);
    },

    goToNextPage : function () {
        // all links , TAG <a>
        var links = document.getElementsByTagName('a');

        // has no link
        if (0 === links.lenght) return false; 

        for (a in links) {
            if (!! links[a].innerHTML && -1 != links[a].innerHTML.search(this._grep) ) {

                //console.log('FIND', links[a], links[a].getAttribute('href') );

                // Next page URL
                this.url = links[a].getAttribute('href');
                this.url = this.parserURL(this.url);

                if ( this.DEBUG ) {
                    console.log("location.href = " + this.url);
                } else {
                    // redirect to next page
                    location.href = this.url;
                }

                break;
            }
        }
    },

    parserURL : function (url) {

        // HANDLE: start with '/', LIKE:'/path/to'
        if ('/' === url.charAt(url.length -1)) 
            url = url.slice(0, -1);

        // HANDLE: not start with 'http://'
        if (0 != url.indexOf('http://')) {
            url =  'http://' + document.domain + '/' +  url;
        }

        return url;
    }
}

// when document ready then init it 
FindNextPage.init();

})();
