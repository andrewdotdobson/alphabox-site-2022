const htmlmin = require('html-minifier')

const now = String(Date.now())

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./styles/tailwind.css')
  

  eleventyConfig.addShortcode('version', function () {
    return now
  })
  eleventyConfig.addPassthroughCopy("assets/img");
  eleventyConfig.addPassthroughCopy("assets/video");
  eleventyConfig.addPassthroughCopy("assets/config");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })
}