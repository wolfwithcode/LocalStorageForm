// Variables
const tweetList = document.getElementById('tweet-list');
// Event Listeners
eventListeners();

function eventListeners(){
    // form submission
    document.querySelector('#form').addEventListener('submit', newTweet);
    // remove tweet from the list
    tweetList.addEventListener('click', removeTweet);

    // document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

// Functions
function newTweet(e){
    e.preventDefault();
    // console.log('Form Submitted!');
    // Read the textarea value
    const tweet = document.getElementById('tweet').value;
    // Create the remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';
    // Create an <li> element
    // console.log(tweet);
    const li = document.createElement('li');
    li.textContent = tweet;
    // Add the remove button to each tweet
    li.appendChild(removeBtn);
    // Add to the list
    tweetList.appendChild(li);
    // add the local storage
    addTweetLocalStorage(tweet);
    // print the alert
    alert('Tweet Added ' + tweet);
    this.reset();
}

// Remove the Tweets from the DOM
function removeTweet(e){
    if(e.target.classList.contains('remove-tweet')){
        // console.log('Yes');        
        e.target.parentElement.remove();
    } 
    // else {
    //     c onsole.log('No');
    // }
    removeTweetLocalStorage(e.target.parentElement.textContent);
}

// Adds from tweets into the local storage
function addTweetLocalStorage(tweet){
    let tweets = getTweetsFromStorage();
    // console.log(tweets);
    // add the tweet into the array
    tweets.push(tweet);
    // convert tweet array into strings
    localStorage.setItem('tweets', JSON.stringify(tweets));
} 


function getTweetsFromStorage(){
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    // Get the values, it null is returns then we create an empty array
    if( tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse( tweetsLS );
    }

    return tweets;
}

// Prints local storage tweets on load
function localStorageOnLoad(e){
    let tweets = getTweetsFromStorage();
    // console.log(tweets);
    tweets.forEach(function(tweet){
        // Create the remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';
        // Create an <li> element
        // console.log(tweet);
        const li = document.createElement('li');
        li.textContent = tweet;
        // Add the remove button to each tweet
        li.appendChild(removeBtn);
        // Add to the list
        tweetList.appendChild(li);
    });
}

function removeTweetLocalStorage(tweet){
    let tweets = getTweetsFromStorage();
    console.log('tweets ' + tweets);
    console.log('tweet ' + tweet);
    const tweetDelete = tweet.substring(0, tweet.length - 1);
    tweets.forEach(function(tweetLS, index){
        if(tweetDelete === tweetLS){
            tweets.splice(index, 1 );
        }
    });
    console.log(tweets);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}