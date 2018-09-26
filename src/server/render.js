const order = ['runtime', 'common', 'app'];
const Render = require('render-template');

module.exports = (req, chunks) => {
  return new Render(chunks, order)
    .meta({charset: 'utf-8'})
    .meta({name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'})
    .meta({name: 'theme-color', content: '#000000'})
    .link({rel: 'shortcut icon', href: 'http://houym-1254119810.cossh.myqcloud.com/favicon.ico'})
    .title('React Components')
    .container('div')
    .toString();
};
