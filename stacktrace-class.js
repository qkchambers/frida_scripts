Java.perform(function() {
    // find and trace all methods declared in a Java Class
    function traceClass(targetClass)
    {
        var hook = Java.use(targetClass);
        var methods = hook.class.getDeclaredMethods();
        hook.$dispose;

        

        methods.forEach(function(targetMethod) {
            console.log(targetMethod.getName())
            traceMethod(targetClass + "." + targetMethod.getName());
        });
    }



     // trace a specific Java Method
    function traceMethod(targetClassMethod)
    {
        console.log(targetClassMethod)
        var delim = targetClassMethod.lastIndexOf(".");
        if (delim === -1) return;

        var targetClass = targetClassMethod.slice(0, delim)
        var targetMethod = targetClassMethod.slice(delim + 1, targetClassMethod.length)

        var hook = Java.use(targetClass);
        var overloadCount = hook[targetMethod].overloads.length;

        console.log("Tracing " + targetClassMethod + " [" + overloadCount + " overload(s)]");

        for (var i = 0; i < overloadCount; i++) {

            hook[targetMethod].overloads[i].implementation = function() {
                console.warn("\n*** entered " + targetClassMethod);

                // print backtrace
                // Java.perform(function() {
                var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
                console.log("\nBacktrace:\n" + bt);
                // });   

                // print args
                if (arguments.length) console.log();
                for (var j = 0; j < arguments.length; j++) {
                    console.log("arg[" + j + "]: " + arguments[j]);
                }

                // print retval
                var retval = this[targetMethod].apply(this, arguments); // rare crash (Frida bug?)
                console.log("\nretval: " + retval);
                console.warn("\n*** exiting " + targetClassMethod);
                return retval;
            }
        }
    }   

    traceClass("android.telephony.TelephonyManager")




});
