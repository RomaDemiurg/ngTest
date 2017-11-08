import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
import * as firebase from 'firebase';

@Component({
    selector: 'app-feeds-list',
    templateUrl: './feeds-list.component.html'
})
export class FeedsListComponent {
    // @Input() feeds
    last: firebase.firestore.DocumentSnapshot[] = []
    start
    startAt
    end
    endAt
    latest
    limit = 3
    initial = true
    idx = 0

    // final: firebase.firestore.DocumentSnapshot
    feeds = []
    feeds$ = []
    lastFeed$: BehaviorSubject<firebase.firestore.DocumentSnapshot|null>

    /* constructor(private zone: NgZone) {
        this.feeds = db.collection('feeds', ref => ref.orderBy('created_at')).valueChanges()
    } */

    constructor(private afs: AngularFirestore) {
        // this.getLastFeedFire()
        // this.getNextFeeds()
        /* afs.collection('feeds', ref => {
            const query = ref.orderBy('created_at', 'desc').limit(1)
            return query
        }).snapshotChanges().forEach(snap => {
            snap.forEach(last => {
                this.final = last.payload.doc
            })
        }) */

        /* this.lastFeed$ = new BehaviorSubject(null)

        this.lastFeed$.switchMap((lastFeed) => 
            afs.collection('feeds', ref => {
                let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref
                if (lastFeed) { query = query.orderBy('created_at').startAfter(lastFeed).limit(3) }
                else { query = query.orderBy('created_at').limit(3) }
                return query
            }).stateChanges().forEach(changes => {
                changes.forEach(change => {
                    if (change.type === 'added') {
                        let exists = false
                        this.feeds.forEach((feed, i) => {
                            if (feed.id === change.payload.doc.id) {
                                exists = true
                            }
                        })

                        if (! exists) {
                            this.last = change.payload.doc
                            const data = change.payload.doc.data()
                            data.id = change.payload.doc.id
                            this.feeds.push(data)
                        }
                    }
                    if (change.type === 'modified') {
                        this.feeds.forEach((feed, i) => {
                            if (feed.id === change.payload.doc.id) {
                                const data = change.payload.doc.data()
                                data.id = change.payload.doc.id
                                this.feeds[i] = data
                            }
                        })
                    }
                    if (change.type === 'removed') {
                        this.feeds.forEach((feed, i) => {
                            if (feed.id === change.payload.doc.id) {
                                this.feeds.splice(i, 1)
                            }
                        })
                    }
                })
            })
        ).subscribe() */

    }


    getNextFeeds() {
        /* if (this.initial) {
            const idx = this.idx
            this.afs.collection('feeds', ref => ref.orderBy('created_at').limit(3)).snapshotChanges().subscribe(snap => {
                const feeds = []
                let doc
    
                snap.forEach(feed => {
                    feeds.push(feed.payload.doc.data())
                    doc = feed.payload.doc
                })
    
                this.feeds[idx] = feeds
                this.last = doc
                this.initial = false
                console.log(this.feeds)
            })
        } else {
            this.idx++
            const idx = this.idx
            this.afs.collection('feeds', ref => ref.orderBy('created_at').startAfter(this.last).limit(3)).snapshotChanges().subscribe(snap => {
                const feeds = []
                let doc
    
                snap.forEach(feed => {
                    feeds.push(feed.payload.doc.data())
                    doc = feed.payload.doc
                })
    
                this.feeds[idx] = feeds
                this.last = doc
                console.log(this.feeds)
            })
        } */
        
        // console.log(this.feeds$[0].subscribe())
        // this.feeds$[0].subscribe()
        /* .subscribe(feeds => {
            this.last = feeds
        }) */

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

        /* firebase.firestore().collection('feeds').orderBy('created_at').startAfter(this.last).limit(3).onSnapshot(snap => {
            snap.docChanges.forEach(change => {
                if (change.type === 'modified') {
                    const data = change.doc.data()
                    data.id    = change.doc.id

                    this.feeds.forEach((feed, i) => (feed.id === change.doc.id) ? this.feeds[i] = data : '' )
                }
            })
        }) */

        // if (this.last.id === this.final.id) return

        // this.lastFeed$.next(this.last)
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

    getLastFeedFire() {
        firebase.firestore().collection('feeds').orderBy('created_at', 'desc').limit(1).onSnapshot(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                this.latest = documentSnapshot
                console.log('getLastFeedFire():', this.latest.data().likes)
            })
        })

        // .where('created_at', '<', 'created_at').limit(1).get().then(lastSnapshot => {})
    }

    addKeyToFeed(key, feed) {
        return {
            key: key,
            author: feed.author,
            img: feed.img,
            likes: feed.likes,
            text: feed.text,
            comments: feed.comments
        }
    }

    getFeeds() {}

    deleteFeed(feedId) {
        const feedRef = firebase.firestore().collection('feeds').doc(feedId)

        feedRef.delete().then(
            success => {
                console.log('Success: deleteFeed()')
            }, 
            error => {
                console.log('Error: deleteFeed()')
            }
        )
    }

    updateLikes(feed) {
        const feedRef = firebase.firestore().collection('feeds').doc(feed.id)

        feedRef.update({likes: feed.likes + 1})
    }

}
