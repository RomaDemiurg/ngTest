import { Component, NgZone, OnInit } from '@angular/core'
import * as firebase from 'firebase'


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    currentUser: firebase.User
    feeds: any

    constructor(private zone: NgZone) { }

    ngOnInit(): void {
        firebase.database().ref('feeds').limitToFirst(3).on('value', (snap) => {
            this.feeds = snap.toJSON()
            console.log(this.feeds)
            this.zone.run(() => {})
        })

        this.currentUser = firebase.auth().currentUser
        console.log('currentUser: ' + this.currentUser)
    }

    getAuthor() {
        console.log('feeds: ' + Object.keys(this.feeds).map((key) => this.feeds[key].author))
    }
}
