/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://tapscabs.com',
    generateRobotsTxt: true, // (optional) Generate robots.txt file
    sitemapSize: 7000,        // optional
    changefreq: 'weekly',
    priority: 0.7,
    exclude: ['/admin'],      // optional: exclude private pages
};

