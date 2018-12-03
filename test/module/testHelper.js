class TestHelper {
    static get HTTPS_SRC(){
        return "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350";
    }

    static get HTTP_SRC(){
        return "http://www.abc.net.au/news/image/9209116-3x2-940x627.jpg";
    }

    static get TEST_PAGE_URL(){
        return "https://surveys.ipsosinteractive.com/surveystest/?pid=S1050000&id=123&ci=fr-fr";
    }

    static getRequestUrls(requestEntries){
        var urls = [];
        requestEntries.forEach(obj => {
            console.log('request: ', obj.request.url);
            urls.push(obj.request.url);
        });

        return urls;
    }

    static getManualProxy(port){
        return { http: 'localhost:' + port, https: 'localhost:' + port };
    }

    static getCapabilities(browserName){
        return { 'browserName': browserName, acceptSslCerts: true, acceptInsecureCerts: true,
            'goog:chromeOptions': {
            "useAutomationExtension":false, // ffor RemoteWebdriver
            "args":['--start-maximized'] // function returns the args-array, so that the values aren't duplicated
            }
        }
    }
}

module.exports = TestHelper 


