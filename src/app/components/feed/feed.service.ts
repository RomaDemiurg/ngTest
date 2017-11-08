import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import { environment } from '../../../environments/environment'

@Injectable()
export class FeedService {
    private feedsSnapshots: firebase.firestore.DocumentSnapshot[] = []
    private startAt
    private endAt
    private limit = environment.settings.feedsLimit
    public  feeds = []
    private feedsRef = firebase.firestore().collection('feeds')
    private query: firebase.firestore.Query

    getNextFeeds() {
        this.setQuery()

        this.query.get().then(snap => {
            if (snap.empty) {console.log('No More Feeds'); return}

            snap.docs.forEach((feed, i) => {
                const data = feed.data()
                data.id    = feed.id
                this.feeds.push(data)

                this.feedsSnapshots.push(feed)
                this.endAt = feed
                if (i === 0) this.startAt = feed
            })

            this.onFeedsChanges()
        })
    }

    private onFeedsChanges() {
        this.query = this.feedsRef.orderBy('created_at').startAt(this.startAt).endAt(this.endAt)

        this.query.onSnapshot(querySnapshot => {
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
                            this.feedsSnapshots.splice(i, 1)
                            console.log('Last feedId:', this.lastFeed.id)
                        }
                    }
                })
            })
        })
    }

    deleteFeed(feedId) {
        const feedRef = this.feedsRef.doc(feedId)

        feedRef.delete().then(
            success => console.log('Success: deleteFeed()'),
            error => console.log('Error: deleteFeed()')
        )
    }

    updateLikes(feed) {
        const feedRef = this.feedsRef.doc(feed.id)

        feedRef.update({likes: feed.likes + 1})
            .then(success => console.log('Success: updateLikes()'))
            .catch(error => console.log('Error: updateLikes()'))
    }

    private get lastFeed(): firebase.firestore.DocumentSnapshot {
        return this.feedsSnapshots[this.feedsSnapshots.length - 1]
    }

    private setQuery() {
        if (this.feeds.length === 0)
            this.query = this.feedsRef.orderBy('created_at').limit(this.limit)
        else
            this.query = this.feedsRef.orderBy('created_at').startAfter(this.lastFeed).limit(this.limit)
    }
}
