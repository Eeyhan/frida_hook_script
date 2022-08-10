

function pass_ssl(){
        var ClassName = "com.android.org.conscrypt.Platform";
        var Platform = Java.use(ClassName);
        var targetMethod = "checkServerTrusted";
        var len = Platform[targetMethod].overloads.length;
        console.log(len);
        for (var i = 0; i < len; ++i) {
            Platform[targetMethod].overloads[i].implementation = function () {
                console.log("class:", ClassName, "target:", targetMethod, " i:", i, arguments);
            };
        }
}

// hook强制更新
function hook_update(){
    var appUpdateActivity = Java.use("com.huawei.updatesdk.service.otaupdate.AppUpdateActivity");
    appUpdateActivity.onCreate.implementation = function (aaa){
        console.log("--------hook update--------")
        showStacks()
        this.finish();
    };
}

function main(){
    Java.perform(function(){
        var SwitchConfig = Java.use('mtopsdk.mtop.global.SwitchConfig')
        SwitchConfig.isGlobalSpdySwitchOpen.implementation = function(){
            console.log('SwitchConfig')
            return false
        }
        pass_ssl();
        hook_update();
})
}
//frida -U com.taobao.taobao -l hook_socker.js


setTimeout(main, 100);