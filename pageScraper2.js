const scraper = {
  url: "https://danielgsc.me/blog",
  async scraper(browser) {
    let page = await browser.newPage();

    await page.goto(this.url);

    await page.waitForSelector(".Page");

    const links = await page.evaluate(async () => {
      const links = [];

      const elements = await document.querySelectorAll(".PostItem");

      for (let el of elements) {
        const link = await el.href;

        links.push(link);
      }

      return links;
    });

    console.log({ links });

    const blogPosts = [];

    for (let link of links) {
      await page.goto(link);

      await page.waitForSelector(".BlogPost");

      const blogPost = await page.evaluate(async () => {
        return {
          title: await document.querySelector(".BlogPost__title").textContent,
          body: await document.querySelector(".BlogPost__html").innerHTML,
        };
      });

      blogPosts.push(blogPost);
    }

    console.log({ blogPosts });
  },
};

module.exports = scraper;
