let Mac = {
    address: function () {
        var Build = plus.android.importClass('android.os.Build');
        if (Build.VERSION.SDK_INT < 23) //android 6.0以下版本
        {
            return this.WifiInfoMac();
        } else if (Build.VERSION.SDK_INT == 23) //android 6.0
        {
            return this.ReaderMac();
        } else {
            return this.NetworkMac();
        }
    },
    WifiInfoMac: function () {
        var Context = plus.android.importClass("android.content.Context");
        var WifiManager = plus.android.importClass("android.net.wifi.WifiManager");
        var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);
        var WifiInfo = plus.android.importClass("android.net.wifi.WifiInfo");
        var wifiInfo = wifiManager.getConnectionInfo();
        return wifiInfo.getMacAddress();
    },
    ReaderMac: function () {
        try {
            var BufferedReader = plus.android.importClass("java.io.BufferedReader");
            var FileReader = plus.android.importClass("java.io.FileReader");
            var file = new FileReader("/sys/class/net/wlan0/address");
            var reader = new BufferedReader(file, 256);
            var address = reader.readLine();
            reader.close();
            return address;
        } catch (error) {
            this.NetworkMac();
            return "02:00:00:00:00:00";
        }
    },
    NetworkMac: function () {
        var NetworkInterface = plus.android.importClass("java.net.NetworkInterface");
        var networkInterface = NetworkInterface.getByName("eth1");
        if (networkInterface == null) {
            networkInterface = NetworkInterface.getByName("wlan0");
        }
        if (networkInterface == null) {
            this.isWifi();
            return "02:00:00:00:00:00";
        }
        var mac = networkInterface.getHardwareAddress();
        var macArr = [];
        for (var i in mac) {
            macArr.push(this.format(mac[i]));
        }
        return macArr.join(":");
    },
    format: function (mac) {
        if (parseInt(mac) >= 0) {
            var numbder = parseInt(mac).toString(16);
            var num = numbder.length == 1 ? "0" + numbder : numbder;
            return num;
        } else {
            var numbder = parseInt(256 - Math.abs(mac)).toString(16);
            var num = numbder.length == 1 ? "0" + numbder : numbder;
            return num;
        }
    },
    isWifi: function () {
        if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_WIFI) {
            return "02:00:00:00:00:00";
        } else {
            // plus.nativeUI.confirm("需要打开WiFi才能获取到MAC地址,是否去打开WiFi", function (event) {
            //     if (event.index == 0) {
            //         var main = plus.android.runtimeMainActivity();
            //         var Intent = plus.android.importClass('android.content.Intent');
            //         var intent = new Intent();
            //         intent.setClassName("com.android.settings",
            //             "com.android.settings.wifi.WifiSettings");
            //         main.startActivity(intent);
            //     }
            // });
        }
    }
};
export default Mac
