/** 
 * @file FindNextPage_test.js
 * 
 * @author lds <lds2012@gmail.com>
 * @version %Id
 * @date 2010-09-04
 */


// shortcut
if (window.console && window.console.log) {
    log = window.console.log;
} else {
    log = window.alert;
}

var obj, // FindNextPage object
    linksNumber, // How many links
    isNextPageNumber; // How many are next page links

module('init this test');

test('init this test', function () {

    // test date
    var HTML = '<div id="testZone" style="display:none">' +
    '<a href="notNextPage.html">链接</a>' +
    '<a href="notNextPage.html">文字</a>' +
    '<a href="notNextPage.html">链接</a>' +
    '<a href="isNextPage.html">下一页</a>' +
    '<a href="isNextPage.html"><span>下一页</span></a>' +
    '<a href="isNextPage.html">下页</a>' +
    '<a href="isNextPage.html">next</a>' +
    '<a href="isNextPage.html">Next</a>' +
    '<a href="notNextPage.html">链接</a>' +
    '</div>';

    jQuery('body').append(HTML);
    ok( 1 === jQuery('#testZone').length, 'test date is already' );

    var $links = jQuery('#testZone>a');

    linksNumber = $links.length;
    isNextPageNumber = $links.filter('[href="isNextPage.html"]').length;


});

// tests all methods
module("methods");

// init method
test('test init', function () {

    ok(window.Lds && 
       window.Lds.FindNextPage &&
       !! window.Lds.FindNextPage &&
       'undefined' !== typeof window.Lds.FindNextPage._count &&
       0 === window.Lds.FindNextPage._count
       , 'FindNextPage has been inited'
    );

    obj = window.Lds.FindNextPage;

});

// setGrep method
test('test setGrep', function(){

    // test String, Number, Array, Object,
    // and RepExp
    var myDate = [ 'string', 23, {}, [], /RepExp/ ],
        oldGrep = obj._grep; // save old grep

    // only accept RepExp Object
    for (i in myDate) {
        var result = obj.setGrep(myDate[i]);
        var type = myDate[i].constructor;

        if (i == myDate.length - 1) {
            equals( obj._grep, myDate[i], 'setGrep accetp : ' + type );
        } else {
            ok(! result, 'setGrep unaccept : ' + type );
        }
    }

    // resume
    obj.setGrep(oldGrep);
});

// bindEvent method
test('test bindEvent', function () {

    // simulate press the hotkey
    // double press ']'
    jQuery(document).simulate('keyup', { keyCode: obj.keyCode.bracket });
    jQuery(document).simulate('keyup', { keyCode: obj.keyCode.bracket });
    
    same(obj._matched, isNextPageNumber, 'All matched');
});


// vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 enc=utf-8 :
