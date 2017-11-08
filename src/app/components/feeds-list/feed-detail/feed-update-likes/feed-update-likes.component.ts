import { Component, Input } from '@angular/core'
import * as firebase from 'firebase'

@Component({
  selector: 'app-feed-update-likes',
  templateUrl: './feed-update-likes.component.html'
})
export class FeedUpdateLikesComponent {
    @Input() feed
    feedRef: firebase.firestore.DocumentReference

    updateLikes() {
        this.feedRef = firebase.firestore().collection('feeds').doc(this.feed.id)

        this.feedRef.update({likes: this.feed.likes + 1})
    }
}
