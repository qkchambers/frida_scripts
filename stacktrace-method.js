Java.perform(function() {
    

    //var methods = eval('Java.classes.TelephonyManager.$methods')
	//hook.$dispose;
    console.log('1')

    // TelephonyManager Hook
    const Tm = Java.use('android.telephony.TelephonyManager');
    var methods = Tm.class.getDeclaredMethods();
    console.log(methods)


    var something = Tm.getSimOperatorName.overload().implementation = function () {

        console.log('[+] Entering TelephonyManager.getSimOperatorName()');
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))

        console.log('[-] Leaving TelephonyManager.getSimOperatorName()');
        console.log('');

        // call original init method
        this.getSimOperatorName.overload().call(this);
        
        return "hi"
    }

    const Wm = Java.use('android.net.wifi.WifiManager');
    var something = Wm.getConnectionInfo.overload().implementation = function () {

        console.log('[+] Entering WifiManager.getConnectionInfo()');
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))

        console.log('[-] Leaving WifiManager.getConnectionInfo()');
        console.log('');

        // call original init method
        var ret2 = this.getConnectionInfo.overload().call(this);
        
        return ret2
    }
    




});
