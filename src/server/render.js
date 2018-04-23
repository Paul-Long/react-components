const order = ['main'];
const Render = require('render-template');

module.exports = (req, chunks) => {
  return new Render(chunks, order)
    .meta({charset: 'utf-8'})
    .meta({name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'})
    .meta({name: 'theme-color', content: '#000000'})
    .link({rel: 'shortcut icon', href: '/favicon.ico'})
    .title('table-virtualized')
    .container('div')
    .toString();
};
