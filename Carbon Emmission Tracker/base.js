const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { titleCase } = require('title-case');

const linksUrl = 'https://protect.earth/links.json';
const readmeFile = path.resolve(`./README.md`);

const replace = (origin, startIndex, endIndex, insertion) => {
  return (
    origin.substring(0, startIndex) + insertion + origin.substring(endIndex)
  );
};

const Markdown = links => {
  const cat_Data = {};

  links.forEach(link => {
    link.categories.forEach(catKey => {
      if (cat_Data[catKey] === undefined) {
        cat_Data[catKey] = {
          title: titleCase(catKey).replace('-', ' '),
          key: catKey,
          links: [],
        };
      }
      cat_Data[catKey].links.push(link);
    });
  });

  const sortedKeys = Object.keys(cat_Data).sort();

  let outputArr = [];

  outputArr = outputArr.concat(
    sortedKeys.map(category => {
      const { title, key } = cat_Data[category];
      return `- [${title}](#${key})`;
    })
  );

  outputArr = outputArr.concat(
    sortedKeys.flatMap(category => {
      const { title, links } = cat_Data[category];
      return (
        [`## ${title}\n`] +
        links
          .map(link => {
            const { title, url, description } = link;
            return `- [${title}](${url}) - ${description}`;
          })
          .sort()
          .join('\n')
      );
    })
  );

  return outputArr.join('\n');
};

const startCursor = '<!-- links:start -->';
const endCursor = '<!-- links:end -->';
const str = fs.readFileSync(readmeFile, 'utf8');


fetch(linksUrl).then(function(response) {
  response.json().then(links => {

    console.log(`Found ${links.length} links.`);
    
    const markdownLines = formatAsMarkdown(links);

    fs.writeFileSync(
      readmeFile,
      replaceBetween(
        str,
        str.indexOf(startCursor) + startCursor.length + 1,
        str.indexOf(endCursor),
        markdownLines
      ),
      'utf8'
    );
  });

})
