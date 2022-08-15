Java.perform(function () {
    function hook_log() {
        dmLogout(TAG, "do hook log");
        var Log = Java.use('android.util.Log');
        Log.v.overload('java.lang.String', 'java.lang.String').implementation = function (tag, content) {
            dmLogout(tag + " v", content);
        };
        Log.d.overload('java.lang.String', 'java.lang.String').implementation = function (tag, content) {
            dmLogout(tag + " d", content);
        };
        Log.w.overload('java.lang.String', 'java.lang.String').implementation = function (tag, content) {
            dmLogout(tag + " w", content);
        };
        Log.i.overload('java.lang.String', 'java.lang.String').implementation = function (tag, content) {
            dmLogout(tag + " i", content);
        };
        Log.e.overload('java.lang.String', 'java.lang.String').implementation = function (tag, content) {
            dmLogout(tag + " e", content);
        };
    }
    hook_log()
})