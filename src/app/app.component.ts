import { Component, NgZone, OnInit } from '@angular/core'
import * as firebase from 'firebase'


@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.css']
})
export class AppComponent implements OnInit {
    currentUser: firebase.UserInfo
    feeds: any

    constructor(private zone: NgZone) { }

    ngOnInit(): void {
        this.getFeeds()
        this.getAuthState()
    }

    getAuthState() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                this.currentUser = user
                if ( this.currentUser )
                    console.log('onAuthStateChanged: LoggedIn', this.currentUser)
                else
                    console.log('onAuthStateChanged: LoggedOut')
            },
            (error) => {
                console.log('Error in onAuthStateChanged:', error)
            }
        )
    }

    logOut() {
        firebase.auth().signOut()
        console.log('Logged Out:')
    }

    logIn() {
        firebase.auth().signInWithEmailAndPassword('qwerty@mail.ru', '123456').then(
            (user: firebase.UserInfo) => {
                console.log('Success in logIn:', user.displayName)
            },
            (error) => {
                console.log('Error in logIn:', error)
            }
        )
    }

    getFeeds() {
        firebase.database().ref('feeds').limitToFirst(3).on('value', (snap) => {
            this.feeds = snap.toJSON()
            console.log(this.feeds)
            this.zone.run(() => {})
        })
    }
}
