// frida -U -f cn.missfresh.application -l ms.js  --no-pause

function Where(stack){
    var at = ""
    for(var i = 0; i < stack.length; ++i){
        at += stack[i].toString() + "\n"
    }
    return at
}

function hook_libart() {
    var symbols = Module.enumerateSymbolsSync("libart.so");
    var addrGetStringUTFChars = null;
    var addrNewStringUTF = null;
    var addrFindClass = null;
    var addrGetMethodID = null;
    var addrGetStaticMethodID = null;
    var addrGetFieldID = null;
    var addrGetStaticFieldID = null;
    var addrRegisterNatives = null;
    for (var i = 0; i < symbols.length; i++) {
        var symbol = symbols[i];
        if (symbol.name.indexOf("art") >= 0 &&
            symbol.name.indexOf("JNI") >= 0 &&
            symbol.name.indexOf("CheckJNI") < 0
        ) {
            if (symbol.name.indexOf("GetStringUTFChars") >= 0) {
                addrGetStringUTFChars = symbol.address;
                console.log("GetStringUTFChars is at ", symbol.address, symbol.name);
            } else if (symbol.name.indexOf("NewStringUTF") >= 0) {
                addrNewStringUTF = symbol.address;
                console.log("NewStringUTF is at ", symbol.address, symbol.name);
            } else if (symbol.name.indexOf("FindClass") >= 0) {
                // addrFindClass = symbol.address;
                console.log("FindClass is at ", symbol.address, symbol.name);
            } else if (symbol.name.indexOf("GetMethodID") >= 0) {
                // addrGetMethodID = symbol.address;
                console.log("GetMethodID is at ", symbol.address, symbol.name);
            } else if (symbol.name.indexOf("GetStaticMethodID") >= 0) {
                // addrGetStaticMethodID = symbol.address;
                console.log("GetStaticMethodID is at ", symbol.address, symbol.name);
            } else if (symbol.name.indexOf("GetFieldID") >= 0) {
                // addrGetFieldID = symbol.address;
                console.log("GetFieldID is at ", symbol.address, symbol.name);
            } else if (symbol.name.indexOf("GetStaticFieldID") >= 0) {
                // addrGetStaticFieldID = symbol.address;
                console.log("GetStaticFieldID is at ", symbol.address, symbol.name);
            } else if (symbol.name.indexOf("RegisterNatives") >= 0) {
                // addrRegisterNatives = symbol.address;
                console.log("RegisterNatives is at ", symbol.address, symbol.name);
            }
        }
    }

    if (addrGetStringUTFChars != null) {
        Interceptor.attach(addrGetStringUTFChars, {
            onEnter: function (args) {},
            onLeave: function (retval) {
                if (retval != null) {
                    var bytes = Memory.readCString(retval);
                    if(bytes != null) {
                        if(bytes.toString().indexOf("mfsnm") >= 0 )
						{
                            console.log("[GetStringUTFChars] result:" + bytes);
                        }
                    }

                }
            }
        });
    }
    if (addrNewStringUTF != null) {
        Interceptor.attach(addrNewStringUTF, {
            onEnter: function (args) {
                if (args[1] != null) {
                    var string = Memory.readCString(args[1]);

                    if(string != null) {
                        if(string.toString().indexOf("mfsnm") >= 0   )
						{
                            console.log("[NewStringUTF] bytes:" + string);

							var threadef = Java.use('java.lang.Thread');
							var threadinstance = threadef.$new();

							var stack = threadinstance.currentThread().getStackTrace();
							console.log("Rc Full call stack:" + Where(stack));

							console.log(Thread.backtrace(this.context, Backtracer.FUZZY)
								.map(DebugSymbol.fromAddress).join("\n"))

                        }
                    }

					// if(string.toString().length > 50 && string.toString().length < 100 ){

				        // var threadef = Java.use('java.lang.Thread');
				        // var threadinstance = threadef.$new();

						// var stack = threadinstance.currentThread().getStackTrace();
						// console.log("Rc Full call stack:" + Where(stack));


				        // console.log(Thread.backtrace(this.context, Backtracer.FUZZY)
						//	.map(DebugSymbol.fromAddress).join("\n"))

					// }
                }
            },
            onLeave: function (retval) {}
        });
    }
    if (addrFindClass != null) {
        Interceptor.attach(addrFindClass, {
            onEnter: function (args) {
                if (args[1] != null) {
                    var name = Memory.readCString(args[1]);
                    console.log("[FindClass] name:" + name);
                }
            },
            onLeave: function (retval) {}
        });
    }
    if (addrGetMethodID != null) {
        Interceptor.attach(addrGetMethodID, {
            onEnter: function (args) {
                if (args[2] != null) {
                    var name = Memory.readCString(args[2]);
                    if (args[3] != null) {
                        var sig = Memory.readCString(args[3]);
                        console.log("[GetMethodID] name:" + name + ", sig:" + sig);
                    } else {
                        console.log("[GetMethodID] name:" + name);
                    }

                }
            },
            onLeave: function (retval) {}
        });
    }
    if (addrGetStaticMethodID != null) {
        interceptor.attach(addrGetStaticMethodID, {
            onEnter: function (args) {
                if (args[2] != null) {
                    var name = Memory.readCString(args[2]);
                    if (args[3] != null) {
                        var sig = Memory.readCString(args[3]);
                        console.log("[GetStaticMethodID] name:" + name + ", sig:" + sig);
                    } else {
                        console.log("[GetStaticMethodID] name:" + name);
                    }

                }
            },
            onLeave: function (retval) {}
        });
    }
    if (addrGetFieldID != null) {
        Interceptor.attach(addrGetFieldID, {
            onEnter: function (args) {
                if (args[2] != null) {
                    var name = Memory.readCString(args[2]);
                    if (args[3] != null) {
                        var sig = Memory.readCString(args[3]);
                        console.log("[GetFieldID] name:" + name + ", sig:" + sig);
                    } else {
                        console.log("[GetFieldID] name:" + name);
                    }

                }
            },
            onLeave: function (retval) {}
        });
    }
    if (addrGetStaticFieldID != null) {
        Interceptor.attach(addrGetStaticFieldID, {
            onEnter: function (args) {
                if (args[2] != null) {
                    var name = Memory.readCString(args[2]);
                    if (args[3] != null) {
                        var sig = Memory.readCString(args[3]);
                        console.log("[GetStaticFieldID] name:" + name + ", sig:" + sig);
                    } else {
                        console.log("[GetStaticFieldID] name:" + name);
                    }

                }
            },
            onLeave: function (retval) {}
        });
    }

    if (addrRegisterNatives != null) {
        Interceptor.attach(addrRegisterNatives, {
            onEnter: function (args) {
                console.log("[RegisterNatives] method_count:", args[3]);
                var env = args[0];
                var java_class = args[1];
                var class_name = Java.vm.tryGetEnv().getClassName(java_class);

                var methods_ptr = ptr(args[2]);

                var method_count = parseInt(args[3]);
                for (var i = 0; i < method_count; i++) {
                    var name_ptr = Memory.readPointer(methods_ptr.add(i * Process.pointerSize * 3));
                    var sig_ptr = Memory.readPointer(methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize));
                    var fnPtr_ptr = Memory.readPointer(methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize * 2));

                    var name = Memory.readCString(name_ptr);
                    var sig = Memory.readCString(sig_ptr);
                    var find_module = Process.findModuleByAddress(fnPtr_ptr);
                    console.log("[RegisterNatives] java_class:", class_name, "name:", name, "sig:", sig, "fnPtr:", fnPtr_ptr, "module_name:", find_module.name, "module_base:", find_module.base, "offset:", ptr(fnPtr_ptr).sub(find_module.base));

                }
            },
            onLeave: function (retval) {}
        });
    }
}

function hook_ssl_verify_result(address)
{
    Interceptor.attach(address, {
        onEnter: function(args) {
            console.log("Disabling SSL validation")
        },
        onLeave: function(retval)
        {
            console.log("Retval: " + retval)
            retval.replace(0x1);
        }
    });

}

// ssl_client
function hookFlutter() {

    var m = Process.findModuleByName("libflutter.so");
	console.log(m.base);

    var pattern = "FF C3 01 D1 FD 7B 01 A9 FC 6F 02 A9 FA 67 03 A9 F8 5F 04 A9 F6 57 05 A9 F4 4F 06 A9 08 0A 80 52 48 00 00 39";
	// var pattern = "FF C3 01 D1 FD 7B 01 A9 FC 6F 02 A9 FA 67 03 A9 F8 5F 04 A9 F6 57 05 A9 F4 4F 06 A9";

    var res = Memory.scan(m.base, m.size, pattern, {

            onMatch: function(address, size){

                console.log('[+] ssl_verify_result found at: ' + address.toString());

                hook_ssl_verify_result(address);

            },

            onError: function(reason){

                console.log('[!] There was an error scanning memory');

            },

            onComplete: function() {

                console.log("All done")

            }

        });

}

function disablePinning()
{
    var m = Process.findModuleByName("libflutter.so");
	console.log(m);

    var pattern = "2D E9 F0 4F 85 B0 06 46 50 20 10 70"

    var res = Memory.scan(m.base, m.size, pattern, {
        onMatch: function(address, size){
            console.log('[+] ssl_verify_result found at: ' + address.toString());
            // Add 0x01 because it's a THUMB function
            hook_ssl_verify_result(address.add(0x01));
        },

        onError: function(reason){
            console.log('[!] There was an error scanning memory');
        },
        onComplete: function()
        {
            console.log("All done")
        }
    });
}

// setImmediate(function(){

function main() {
    // /*
    Java.perform(function () {
        var s = Java.use('ob.a0')
        s.b.implementation = function () {
            console.log('------>')
            this.b()
        }
		// 64位用这个
		hookFlutter();

		// 32位用这个
		// disablePinning();

    });
    // */

}

// );

// App加壳了，所以加个时间延迟
setTimeout(main, 10000);
