import { Component, Input } from '@angular/core'
import * as firebase from 'firebase'

@Component({
  selector: 'app-feed-delete',
  templateUrl: './delete.html'
})
export class FeedDeleteComponent {
    @Input() feedId
    feedRef: firebase.firestore.DocumentReference

    deleteFeed() {
        this.feedRef = firebase.firestore().collection('feeds').doc(this.feedId)

        this.feedRef.delete().then(
            success => {
                console.log('Success: deleteFeed()')
            },
            error => {
                console.log('Error: deleteFeed()')
            }
        )
    }
}
