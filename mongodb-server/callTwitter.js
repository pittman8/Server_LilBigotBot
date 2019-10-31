const Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'IZxaMDJV47KGZenRuUZNVjTDg',
  consumer_secret: 'B0wZU3AQSSD2qQmxSiwg4bhAus8nEL4zsdenFrBTnzTrrzlKyd',
  access_token_key: '1182470238203334656-chZlNp3RTBZNqWs9clanJAVtIvKXgP',
  access_token_secret: '55rd6ZJyf6nJgm7PrU1NiXEhkL5eRkH6HRdIoR13ed10k'
});
 
var params = {screen_name: 'isit_test_account'};
client.get('search/tweets', {q: 'from:isittestaccount two'}, function(error, tweets, response) {
    console.log(tweets);
 });