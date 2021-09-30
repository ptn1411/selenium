const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

(async function main() {
    fs.readFile('link.txt', 'utf8', async function (err, data) {
        if (err) {
            console.log(err);
        } else {
            const link = data.split("\n");

            link.map((link, index) => download(link,index));
        }
    });

    async function download(url, i) {
        const file = fs.createWriteStream(`./video/video${i}.mp4`);

        await https.get(url, function (response) {
            response.pipe(file);
        });
    }

    function sleep(n) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
    }
})();

