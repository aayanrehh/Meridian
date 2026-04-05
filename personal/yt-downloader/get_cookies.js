const { chromium } = require('playwright');
const fs = require('fs');

async function main() {
    console.log("\n=======================================================");
    console.log("Launching browser...");
    console.log("1. Please solve the bot check or sign into YouTube.");
    console.log("2. Once you are done, simply CLOSE THE BROWSER WINDOW.");
    console.log("=======================================================\n");

    const context = await chromium.launchPersistentContext('./playwright-profile', {
        headless: false
    });

    const page = context.pages()[0] || await context.newPage();
    await page.goto('https://www.youtube.com');

    // Wait until the page is closed by the user
    await new Promise(resolve => page.on('close', resolve));

    console.log("\nBrowser closed! Saving your authentication cookies...");

    const cookies = await context.cookies();
    
    // Convert to Netscape cookie format for yt-dlp
    let cookieTxt = "# Netscape HTTP Cookie File\n# This is a generated file!  Do not edit.\n\n";
    for (const cookie of cookies) {
        const domain = cookie.domain.startsWith('.') ? cookie.domain : `.${cookie.domain}`;
        const flag = cookie.domain.startsWith('.') ? "TRUE" : "FALSE";
        const path = cookie.path;
        const secure = cookie.secure ? "TRUE" : "FALSE";
        const expiration = Math.floor(cookie.expires);
        const name = cookie.name;
        const value = cookie.value;
        
        cookieTxt += `${domain}\t${flag}\t${path}\t${secure}\t${expiration}\t${name}\t${value}\n`;
    }

    fs.writeFileSync('cookies.txt', cookieTxt);
    console.log("Cookies saved to cookies.txt successfully! You can now resume downloads.");
    
    await context.close();
}

main().catch(console.error);
