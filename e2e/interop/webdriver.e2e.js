const assert = require('node:assert')
const chromedriver = require('chromedriver')
const WebDriver = require('../../packages/webdriver')

;(async () => {
    await chromedriver.start(['--port=4444'])
    const client = await WebDriver.newSession({
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }
        }
    })

    await client.navigateTo('https://www.google.com/ncr')
    assert.equal(await client.getTitle(), 'Google')
    await client.deleteSession()
})().then(
    () => {
        console.log('WebDriver CJS Test Passed!')
        chromedriver.quit()
        process.exit(0)
    },
    () => {
        console.log('WebDriver CJS Test Failed!')
        chromedriver.quit()
        process.exit(1)
    }
)
