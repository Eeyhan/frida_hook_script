function main() {
    Java.perform(function () {
        var NetworkInfo = Java.use("android.net.NetworkInfo")
        NetworkInfo.isConnected.implementation = function(){
            console.log("first called!")
            var result = this.isConnected()
            console.log('result',result)
            return false
            // return result
        }
        var network = Java.use('java.net.NetworkInterface')
        network.getName.implementation = function () {
            console.log("second called!")
            var name = this.getName()
            console.log('name:' + name)
            if (name == "tun0") {
                // var result = Java.use('java.lang.String').$new('rmnet_data0')
                var result = Java.use('java.lang.String').$new('ccmni1')
                console.log('hook result:' + result)
                return result
            } else {
                return name
            }
        }

        var NetworkCapabilities = Java.use("android.net.NetworkCapabilities")
        NetworkCapabilities.hasTransport.overload('int').implementation = function (arg) {
            console.log("third called!",arg)
            var result = this.hasTransport(arg)
            console.log('result',result)
            // return result
            return false
        }
        var ConnectivityManager = Java.use("android.net.ConnectivityManager")
        ConnectivityManager.getNetworkCapabilities.implementation = function (arg) {
            console.log("four called!",arg)
            var result = this.getNetworkCapabilities(arg)
            console.log('result',result)
            return result
            // return false
        }
        // android.net.ConnectivityManager.getNetworkCapabilities
    })
}

setImmediate(main,1000)


