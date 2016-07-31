const fs = require('fs');
const yaml = require('js-yaml');


const book = yaml.safeLoad(fs.readFileSync('./book.yaml', 'utf-8'));


describe('Code syntax highlighting', function() {


  beforeEach(function() {
    let specificityArticle = book.articles.find((article) =>
        article.path.indexOf('do-we-actually-need-specificity-in-css') > -1);

    browser.url(specificityArticle.path);
  });


  it('should be present on code blocks', function() {
    browser.waitForExist('pre code.language-css');
  });


  it('should allow for marking specific sections', function() {
    browser.waitForExist('pre code.language-css mark');
  });

});
