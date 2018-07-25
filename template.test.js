const pug = require('pug');

const renderPug = data => pug.renderFile('./template.pug', data);

test('It should render pug correctly', () => {
  expect(renderPug({
    myTitle: 'Pug',
    myText: 'Pug is great'
  })).toMatchSnapshot();
});

const fs = require('fs');
const Handlebars = require('handlebars');
const renderHandlebars = Handlebars.compile(fs.readFileSync('./template.handlebars', 'utf-8'));

test('It should render handlebars correctly', () => {
  expect(renderHandlebars({
    myTitle: 'Handlebars',
    myText: 'Handlebars is great'
  })).toMatchSnapshot();
});
