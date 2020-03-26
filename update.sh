curl -o src/data/timeseries.json 'https://pomber.github.io/covid19/timeseries.json'
yarn build
git add .
git commit -a -m 'data'
git push -u origin master