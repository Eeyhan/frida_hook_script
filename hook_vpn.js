function main(){
    Java.perform(function (){
        Java.use("android.net.NetworkInfo").isConnected.implementation = function(){
            console.log("first called!")
            return false
        }

        Java.use("java.net.NetworkInterface").getName.implementation = function(){
            console.log("second called!")
            return ""
            // return null
        }

        Java.use("android.net.NetworkCapabilities").hasTransport.implementation=function(){
            console.log("third called!")
            return false
        }
        //android.net.ConnectivityManager.getNetworkCapabilities
    })
}

setImmediate(main)