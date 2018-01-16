import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import { environment } from '../../../environments/environment'

interface CommentsSnapshots {
    [feedId: string]: firebase.firestore.DocumentSnapshot[]
}

@Injectable()
export class FeedService {
    public  feeds = []
    private feedsSnapshots: firebase.firestore.DocumentSnapshot[] = []
    private commentsSnapshots = []
    private startAt
    private endAt
    private commentEndAt
    private commentStartAt
    private limit = environment.settings.feedsLimit
    private feedsRef = firebase.firestore().collection('feeds')

    getNextFeeds() {
        this.query.get().then(snap => {
            if (snap.empty) {console.log('No More Feeds'); return}

            snap.docs.forEach((feed, i) => {
                const data = feed.data()
                data.id    = feed.id
                data.comments = []
                this.feeds.push(data)

                this.feedsSnapshots.push(feed)
                this.commentsSnapshots[feed.id] = []
                this.endAt = feed
                if (i === 0) this.startAt = feed

                this.getNextCommentsByFeedId(feed.id)
            })

            this.onFeedsChanges()
        })
    }

    getNextCommentsByFeedId(feedId: string) {
        this.commentsQuery(feedId).get().then(snap => {
            if (snap.empty) {console.log('No More Comments'); return}

            snap.docs.forEach((comment, i) => {
                const data = comment.data()
                data.id    = comment.id
                const idx = this.findFeedIndexByFeedId(feedId)
                this.feeds[idx]['comments'].push(data)

                this.commentsSnapshots[feedId].push(comment)
                console.log(this.commentsSnapshots)
                console.log(this.lastCommentByFeedId(feedId))

                this.commentEndAt = comment
                if (i === 0) this.commentStartAt = comment
            })

            this.onCommentsChanges()
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

    private onFeedsChanges() {
        const query = this.feedsRef.orderBy('created_at').startAt(this.startAt).endAt(this.endAt)

        query.onSnapshot(querySnapshot => {
            querySnapshot.docChanges.forEach(change => {
                const idx = this.findFeedIndexByFeedId(change.doc.id)

                if (change.type === 'modified') {
                    const data = change.doc.data()
                    data.id    = change.doc.id
                    this.feeds[idx] = data
                }
                if (change.type === 'removed') {
                    this.feeds.splice(idx, 1)
                    this.feedsSnapshots.splice(idx, 1)
                    console.log('Last feedId:', this.lastFeed.id)
                }
            })
        })
    }

    private onCommentsChanges() {

    }

    private get lastFeed(): firebase.firestore.DocumentSnapshot {
        return this.feedsSnapshots[this.feedsSnapshots.length - 1]
    }

    private lastCommentByFeedId(feedId): firebase.firestore.DocumentSnapshot {
        const len = this.commentsSnapshots[feedId].length - 1
        return this.commentsSnapshots[feedId][len]
    }

    private get query(): firebase.firestore.Query {
        if (this.feeds.length === 0)
            return this.feedsRef.orderBy('created_at').limit(this.limit)
        else
            return this.feedsRef.orderBy('created_at').startAfter(this.lastFeed).limit(this.limit)
    }

    private commentsQuery(feedId: string): firebase.firestore.Query {
        let query: firebase.firestore.Query
        query = this.feedsRef.doc(feedId).collection('comments').orderBy('created_at')

        const idx = this.findFeedIndexByFeedId(feedId)

        if (this.feeds[idx]['comments'].length === 0)
            query.limit(this.limit)
        else
            query.startAfter(this.lastCommentByFeedId(feedId)).limit(this.limit)

        return query
    }

    private findFeedIndexByFeedId(feedId: string): number {
        return this.feeds.findIndex(feed => feed.id === feedId)
    }
}
