import { getUserInfo } from "./userApi";


export async function createTweet(tweet, controller) {
    const result = await controller.methods.createTweet(tweet).send();
    return result;
}

export async function getTweetInfo(tweetId, storage) {
    const tweet = await storage.methods.tweets(tweetId).call();
    const {id, text, userId, postedAt} = tweet;

    return {
        id: parseInt(id),
        userId: parseInt(userId),
        text,
        postedAt: parseInt(postedAt),
    }
}

export async function getTweetFromUser(userId, storage) {
    // const tweetIds = await storage.getTweetIdsFromUser.call(userId);
    var tweetIds = await storage.methods.getTweetIdsFromUser(userId).call();
    return tweetIds.map(tweetId => parseInt(tweetId)).reverse();
}

export async function loadTweetsFromTweetPromises(tweetPromises, storage){
    const tweets = await Promise.all(tweetPromises);
    const userPromises = tweets.map(tweet => {
        const {userId} = tweet;
        return getUserInfo(userId, storage);
    });
    const users = await Promise.all(userPromises);
    return tweets.map((tweet, index) => {
        return {
            user: users[index],
            tweet
        }
    })
}

export async function getLatestTweetIds(storage, amount = 20, page = 1){
    const numTweets = await storage.methods.getNumTweets().call();
    const tweetIdPromises = [];

    const lastIndex = numTweets;
    const pageIndex = page - 1;
    const startIndex = lastIndex - (amount * pageIndex);
    const maxIndex = startIndex - amount;
    for(let i = startIndex; i > maxIndex && i > 0; i--){
        tweetIdPromises.push(storage.methods.tweets(i).call());
    }
    
    return tweetIdPromises;
}