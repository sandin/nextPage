/** 
 * @file FindNextPage.js
 * 
 * @author lds <lds2012@gmail.com>
 * @version %Id
 * @date 2010-09-04
 */
(function(window, undefined){


/** @namespace */
window.Lds = {};

// shortcuts
var document = window.document;


var FindNextPage = { 

    /** 
     * Current version
     *
     * @type string
     */
    version : '1.0',

    /**
     * Debug or not, it's only for debug
     *
     * @type bool
     */
    DEBUG  : false,

    /**
     * How many link matched for debug.
     *
     * @type number
     * @private
     */
    _matched : 0,

    /**
     * Search pattern
     *
     * @type string
     * @private
     */
    _grep : /Next|下一页|下页|后页|^>>$/ig,

    /**
     * Count press time
     *
     * @type number
     * @private
     */
    _count : 0,

    /**
     * Next page URL
     *
     * @type string
     */
    url : '',

    /**
     * keyCode Map
     *
     * @type object
     */
    keyCode : {
        // ']'
        bracket : 221
    },

    /**
     * Init 
     *
     * @returns {bool} 
     */
    init : function () { 
        // save it to the namespace
        window.Lds.FindNextPage = this;

        // bind All the event handler
        this.bindEvent();

        return true;
    },

    /** 
     * Set search pattern
     *
     * @param {RepExp} grep
     * 
     * @returns {bool} Return false when param is not a RepExp Object
     */
    setGrep : function (grep) {
        // grep must be a RepExp Object
        if ('undefined' !== typeof grep && !!grep && grep instanceof RegExp) {
            this._grep = grep;
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * Bind event handler  
     *
     * @returns {bool} Always return true
     */
    bindEvent : function () {
        // shortcut
        var self  = this;

        // Bind document keydown event
        document.addEventListener('keyup', function(e){
            if (self.DEBUG) { 
                console.log('keyCode : ' + e.keyCode + ' & count : '   + self._count);
            }

            // press ']' first and then press another key 
            if (self.keyCode.bracket != e.keyCode && self._count > 0) {
                self._count = 0;
            }

            if (self.keyCode.bracket === e.keyCode) {
                if ( 1 === self._count ) {
                    self._count = 0; // reset count
                    self.goToNextPage(); // double press ']'
                }
                else {
                    self._count++; // press ']' at first time
                }
            }
        }, false);

        return true;
    },

    /**
     * goToNextPage
     *
     * This function will redirect to the next page 
     * when find the 'next page' link in this page HTML.
     *
     * @returns void
     *  
     */
    goToNextPage : function () {
        // all links , TAG <a>
        var links = document.getElementsByTagName('a');

        // has no link
        if (0 === links.length) return false; 

        for (a in links) {
            if ( links[a].innerHTML && -1 != links[a].innerHTML.search(this._grep) ) {

                // Next page URL
                this.url = links[a].getAttribute('href');
                this.url = this.parserURL(this.url);

                if ( this.DEBUG ) {
                    console.log("location.href : " + 
                                this.url + ' & HTML : ' +
                                links[a].innerHTML);
                    this._matched++;
                } else {
                    // redirect to next page
                    location.href = this.url;
                    break;
                }
            }
        }
    },

    /**
     * parserURL Parser URL which is the next page link
     *
     * @param {string} url
     *
     * @returns {string} url 
     */
    parserURL : function (url) {
        // nothing to do
        return url;
    },

    /**
     * destroy 
     *
     * @returns void
     */
    destroy : function () {
        this._matched = 0;
        this._conut = 0;
    }
}

// When document ready, init it 
FindNextPage.init();

// communicate with this extension background page
chrome.extension.sendRequest({command: "getOptions"}, function(options) {

    // set search pattern with user options
    if ( 'undefined' !== typeof options.grep &&
         'string' === typeof options.grep) {
        var pattern = new RegExp(options.grep,'i');
        FindNextPage.setGrep(pattern);

        if (FindNextPage.DEBUG)
            console.log('search pattern : ' + FindNextPage._grep);
    }
});

})(window);

// vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 enc=utf-8 :
