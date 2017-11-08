import { Component, Input } from '@angular/core'
import * as firebase from 'firebase'

@Component({
    selector: 'app-feed-detail',
    templateUrl: './feed-detail.component.html'
})
export class FeedDetailComponent {
    @Input() feed
    // feedRef: firebase.firestore.DocumentReference

    /* updateLikes(feed) {
        this.feedRef = firebase.firestore().collection('feeds').doc(feed.id)

        this.feedRef.update({likes: feed.likes + 1})
    } */

    /* deleteFeed(feedId) {
        this.feedRef = firebase.firestore().collection('feeds').doc(feedId)

        this.feedRef.delete().then(
            success => {
                console.log('Success: deleteFeed()')
            }, 
            error => {
                console.log('Error: deleteFeed()')
            }
        )
    } */

}
