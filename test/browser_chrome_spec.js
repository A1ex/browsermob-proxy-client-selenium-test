
'use strict';

const chai = require('chai');
const expect = chai.expect;
const BrowserMob = require('browsermob-proxy-client');
const webdriver = require('selenium-webdriver');
const selProxy = require('selenium-webdriver/proxy');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const TestHelper = require('../test/module/testHelper')

var defaultProxy;

describe('Browser - Chrome', function () {

    beforeEach(async () => {
        defaultProxy = BrowserMob.createClient();
        await defaultProxy.start();
    });

    afterEach(async () => {
        await defaultProxy.closeProxies();
        await defaultProxy.end();
    });


    it("Chrome", async () => {
        await defaultProxy.createHar(defaultProxy.proxy.port,
                {
                'captureHeaders':'true',
                'captureContent':'true',
                'captureBinaryContent':'true'
                },
                function (err, result){
                    if(err){
                      console.log(err)
                    }else{
                      console.log(result)
                      if (typeof callback === "function") {
                        console.log(this.options.desiredCapabilities.proxyObj);
                        console.log(this.options.desiredCapabilities.proxyport);
                       // console.log(result);
                        callback.call(self, result);
                     }
                    }
                }            
        );
        defaultProxy.captureHeaders=true;
        defaultProxy.captureContent=true;
        defaultProxy.captureBinaryContent=true;

        let driver = new webdriver.Builder()
            .withCapabilities(TestHelper.getCapabilities('chrome'))
            .setProxy(selProxy.manual(TestHelper.getManualProxy(defaultProxy.proxy.port)))
            .build();
        await driver.get(TestHelper.TEST_PAGE_URL);

        const har = await defaultProxy.getHar();
        console.log(har.log.entries)
        /*var urls = TestHelper.getRequestUrls(har.log.entries);
        await driver.close();

        expect(urls.includes(TestHelper.HTTPS_SRC)).to.be.eql(true);
        expect(urls.includes(TestHelper.HTTP_SRC)).to.be.eql(true);*/

    });   

});
