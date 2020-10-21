import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tweet } from '../_models/tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  API_URI = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

    getTweets() {
      return this.http.get<Tweet[]>(this.API_URI+'/tweet');
    }

    getTweet(id:number) {
      return this.http.get<Tweet>(this.API_URI+'/tweet/'+id);
    }

    getTweetsPersona(id_persona:number) {
      return this.http.get<Tweet[]>(this.API_URI+'/tweet/persona/'+id_persona);
    }

    createTweet(tweet:Tweet, id_persona:number) {
      return this.http.post(this.API_URI+'/tweet/'+id_persona, tweet);
    }

    updateTweet(tweet:Tweet, id:number, id_persona:number) {
      return this.http.put(this.API_URI+'/tweet/'+id+'/'+id_persona, tweet);
    }

    deleteTweet(id:number) {
      return this.http.delete(this.API_URI+'/tweet/'+id);
    }

}
