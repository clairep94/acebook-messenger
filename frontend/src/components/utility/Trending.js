
class TrendingCalculator {
  constructor() {
    // was messing around whith these numbers, feel free to change them, its a bit tricky for me to figure out if any of this works!

    this.newPostWeight = 0.1 // gives new posts a flat head start if you make this the same as the trending threshold, posts will trend for 1 min
    this.trendingTreshold = 0.1 // the treshold for something to be trending the higher it is the harder it is to trend
    this.likeWeight = 1 // how much of an impact likes have on the trending value
    this.commentWeight = 10 // how much of an impact comments have on the trending value, its curently very high
    this.streakTime = 6000 // this is the amount of time you have to get a streak currently set to one hour
    this.streakThreshold = 3 // how many comments you need to get a streak
    this.streakWeight = 200 // how much of an impact a streak has on the trending value
  
    
  }
  getTrendingValue(post){
   
    const likes = post.likes.length * this.likeWeight 
    const streak = this.getCommentStreak(post) * this.streakWeight
    const comments = post.comments.length * this.commentWeight
    const trend = likes + comments + this.newPostWeight + streak
    return trend

    
  }
  getTrendingResult(post){
    const time = this.getTimeDiff(post) / 60 
    const trend = this.getTrendingValue(post)
    
    
    return trend / time //  the longer ago something was posted the harder it is to start trending
  }
  isPostTrending(post){
    // there a curently two ways to get 
    if(this.getTrendingResult(post) > this.trendingTreshold){
      return true
    }
    else if(this.getCommentStreak(post) > this.streakThreshold){
      return true
    }else{
      return false
    }
  }
  getTimeDiff(post){
    const postedDateTime = new Date(post.date_posted);
    const currentDateTime = new Date()
    const res = (currentDateTime.getTime() - postedDateTime.getTime()) / 1000;
    
    return res 
  }
  getCommentStreak(post){
    const times = post.comments.map(comments => this.getTimeDiff(comments)

      )

    const streak = times.filter(time => time < this.streakTime)
    return streak.length
    




  }
  
  
}
export default TrendingCalculator