const puppeteer = require('puppeteer');

const checkSeo = async (url) => {
    let browser;
    try {
        browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        const seo = await page.evaluate(() => {
            return {
                seo: {
                    title: {
                        found: document.title ? true : false,
                        value: document.title,
                    },
                    metaDescription: {
                        found: document.querySelector('meta[name="description"]') ? true : false,
                        value: document.querySelector('meta[name="description"]').content
                    },
                    h1: {
                        found: document.querySelector('h1') ? true : false,
                        value: document.querySelector('h1')?.innerText
                    },
                    viewportTag: {
                        found: document.querySelector('meta[name="viewport"]') ? true : false,
                    },
                    images: {
                        total: Array.from(document.querySelectorAll('img')).length,
                        missingAlt: Array.from(document.querySelectorAll('img')).filter(img => !img.alt).length,
                    }
                }
            }
        });
        return seo
    } catch (error) {
        return { error: error.message };
    } finally {
        if (browser) await browser.close();
    }
}
module.exports = { checkSeo };