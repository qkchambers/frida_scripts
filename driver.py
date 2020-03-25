import frida, sys

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)


with open('stacktrace2.js', 'r') as file:
    jscode = file.read()



process = frida.get_usb_device().attach('com.mypackage.contactsexample')
script = process.create_script(jscode)
script.on('message', on_message)
print('[*] Running CTF')
script.load()
sys.stdin.read()
