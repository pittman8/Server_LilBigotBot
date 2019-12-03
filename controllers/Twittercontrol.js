const Twitter = require('twitter');

/*
Functions for communicating with the twitter API
*/

var client = new Twitter({
  consumer_key: 'IZxaMDJV47KGZenRuUZNVjTDg',
  consumer_secret: 'B0wZU3AQSSD2qQmxSiwg4bhAus8nEL4zsdenFrBTnzTrrzlKyd',
  access_token_key: '1182470238203334656-chZlNp3RTBZNqWs9clanJAVtIvKXgP',
  access_token_secret: '55rd6ZJyf6nJgm7PrU1NiXEhkL5eRkH6HRdIoR13ed10k'
});
 
//Takes in search string and handle. Sends request to twitter search API and returns the tweet objects as json string
exports.twitconn = (u, s, res) => {
return new Promise(function(resolve,reject){
    client.get('search/tweets', {q: 'from:'+u+s}, function(error, tweets, response) {
        resolve(JSON.stringify(tweets));
     });
})
};
