export default function Reducer (state, action) {
    if(action.type === "ADD_TWEET")
    {
        return {
            ...state,
            tweetList : [action.payload, ...state.tweetList]
        }
    } else if(action.type === "ADD_USER"){
        return {
            ...state,
            user: action.payload
        }
    } else if(action.type === "ADD_BULK_TWEETS"){
        return {
            ...state,
            page: state.page + 1,
            tweetList: [...state.tweetList, ...action.payload]
        }
    } 
    else return state;
}