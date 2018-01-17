import { Component } from '@angular/core'
import { FeedService } from '../feed.service'
import * as firebase from 'firebase'

interface Comment {
    id?: string
    author: string
    img: string
    likes: number | string
    text: string
    created_at: Date
}

@Component({
    selector: 'app-feeds-list',
    templateUrl: './list.html'
})
export class FeedsListComponent {

    constructor(public feedService: FeedService) {
        this.feedService.getNextFeeds()
    }

    createComment(feedId, author, img, likes, text) {
        const comment: Comment = {
            author: author,
            img: img,
            likes: likes,
            text: text,
            created_at: new Date()
        }

        /*firebase.database().ref('comments/' + this.feedKey).push(comment)*/

        // feeds/MO6bD7As3gO2KPvGw2Sa/comments/h3aPBrJQQacOeAbYvqgp
        firebase.firestore().collection('feeds/' + feedId + '/comments').add(comment)
    }

}
