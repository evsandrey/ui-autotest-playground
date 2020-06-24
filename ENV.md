npm install -g ejs

npm run compile

docker build -t at-playground .
docker run --rm --name target -d -p 80:80 at-playground