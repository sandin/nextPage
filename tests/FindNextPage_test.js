if (window.console && window.console.log) {
    log = window.console.log;
} else {
    log = window.alert;
}

var obj;

module("init");


module("methods");

// init method
test('init', function () {

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
test('setGrep', function(){

    // test String, Number, Array, Object,
    // and RepExp
    var myDate = [ 'string', 23, {}, [], /RepExp/ ];

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
});

// bindEvent method
test('bindEvent', function () {
    log(Lds);
    //var e = jQuery.event;
    //e.keyCode = 221;
    //jQuery('body').trigger('keyDown');
    //jQuery('body').trigger('keyDown');


});

