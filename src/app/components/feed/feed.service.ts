import { Injectable } from '@angular/core'
import * as firebase from 'firebase'

@Injectable()
export class FeedService {
    feedRef: firebase.firestore.DocumentReference

    deleteFeed(feedId) {
        this.feedRef = firebase.firestore().collection('feeds').doc(feedId)

        this.feedRef.delete().then(
            success => console.log('Success: deleteFeed()'),
            error => console.log('Error: deleteFeed()')
        )
    }

    updateLikes(feed) {
        this.feedRef = firebase.firestore().collection('feeds').doc(feed.id)

        this.feedRef.update({likes: feed.likes + 1})
            .then(success => console.log('Success: updateLikes()'))
            .catch(error => console.log('Error: updateLikes()'))
    }

}
