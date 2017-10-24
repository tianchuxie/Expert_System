function _coverage(len) {
    len = +len;
    if (!len)
        throw "Must provide a non-zero length.";
    var arr = [];
    for (var i = 0; i < len; i++)
        arr[i] = 0;
    var subs = {};
    this.m = function(x, len) {
        if (subs[x])
            return subs[x];
        else
            return subs[x] = new _coverage(len);
    };
    this.c = function(i) {
        if (i >= len)
            throw "Out of bounds.";
        else if (arr[i])
            arr[i]++;
        else
            arr[i] = 1;
    };
    this.o = function(tab0) {
        var tab1;
        if (!tab0)
            tab0 = tab1 = "";
        else
            tab1 = tab0 + "  ";
        var tab2 = tab1 + "  ";
        for (var i = 0; i < arr.length; i++)
            console.log(tab0 + i + ": " + (arr[i] || "NONE"));
        for (var sub in subs) {
            console.log(tab1 + sub);
            subs[sub].o(tab2);
        }
    };
};