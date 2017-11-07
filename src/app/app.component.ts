import { Component } from '@angular/core'
import * as firebase from 'firebase'

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    last: firebase.firestore.DocumentSnapshot[] = []
    startAt
    endAt
    limit = 3
    initial = true
    feeds = []

    getNextFeeds() {
        let query: firebase.firestore.Query

        if (this.initial) {
            this.initial = false
            query = firebase.firestore().collection('feeds').orderBy('created_at').limit(3)
        } else {
            query = firebase.firestore().collection('feeds').orderBy('created_at').startAfter(this.last[this.last.length - 1]).limit(3)
        }

        query.get().then(snap => {
            if (snap.empty) {console.log('No More Feeds'); return}

            snap.docs.forEach((feed, i) => {
                const data = feed.data()
                data.id    = feed.id
                this.feeds.push(data)

                this.last.push(feed)
                this.endAt = feed
                if (i === 0) this.startAt = feed
            })

            this.onFeedsChanges()

        })
    }

    onFeedsChanges() {
        firebase.firestore().collection('feeds').orderBy('created_at').startAt(this.startAt).endAt(this.endAt).onSnapshot(querySnapshot => {
            querySnapshot.docChanges.forEach(change => {
                this.feeds.forEach((feed, i) => {
                    if (feed.id === change.doc.id) {
                        if (change.type === 'modified') {
                            const data = change.doc.data()
                            data.id    = change.doc.id
                            this.feeds[i] = data
                        }
                        if (change.type === 'removed') {
                            this.feeds.splice(i, 1)
                            this.last.splice(i, 1)
                            console.log('Last feedId:', this.last[this.last.length - 1].id)
                        }
                    }
                })
            })
        })
    }
}
