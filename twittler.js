      $(document).ready(function(){
        var $body = $('body');
        var $tweets = $('#tweets');
        $tweets.empty();
        var displayed = -1;
        var homeTitle = 'Twittler'
        //$body.html('');
        
        function displayTweet(tweet) {
          var $tweet = $('<div class="tweet"></div>');
          var $userLink = $('<a href="#"></a>');
          var $tweetHeader = $('<div class="tweetHeader"></div>');
          
          $userLink.text(tweet.user);
          $userLink.attr('href', '#'+tweet.user);
          $userLink.attr('class', 'userLink')
          var userHTML = $userLink.clone().wrap('<p>').parent().html();
          
          var $dateSpan = $('<span class="date"></span>');
          $dateSpan.text('tweeted at: ' + tweet.created_at);
          var dateHTML = $dateSpan.clone().wrap('<p>').parent().html();
          
          $tweetHeader.html('@' + userHTML + ' ' + dateHTML);
          var headerHTML = $tweetHeader.clone().wrap('<p>').parent().html();
          
          $tweet.html(headerHTML + '<p>'+tweet.message+'</p>');
          $tweet.appendTo($tweets);
        }
        
        function displayTweets() {
          if ($('#title').text !== homeTitle) { 
            $tweets.empty();
            $("#title").text(homeTitle);
          }
          var index = streams.home.length - 1;
          var total = index;
          while(index > displayed){
            var tweet = streams.home[index];
            displayTweet(tweet);
            index -= 1;
          }
          displayed = total;
        }
        
        function displayUsersTweets(username) {
          $("#title").text(username);
          var index = streams.users[username].length - 1;
          $tweets.empty();
          while(index >= 0){
            var tweet = streams.users[username][index];
            displayTweet(tweet);
            index -= 1;
          }
          displayed = -1;
        }

        displayTweets();

        $('#newTweets').on('click', function() {
          displayTweets();
        });
        
        $tweets.on('click', '.userLink', function() {
          event.preventDefault();
          event.stopPropagation();
          var user = this.text;
          displayUsersTweets(user);
        });
      });