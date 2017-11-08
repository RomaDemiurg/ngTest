import { Injectable } from '@angular/core'
import * as firebase from 'firebase'

@Injectable()
export class FeedService {
    feedRef: firebase.firestore.DocumentReference

    deleteFeed(feedId) {
        this.feedRef = firebase.firestore().collection('feeds').doc(feedId)

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
