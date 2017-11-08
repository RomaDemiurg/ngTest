import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import {
    MdCardModule, MdToolbarModule, MdButtonModule, MdDatepickerModule, MdInputModule,
    MdIconModule, MdListModule, MdExpansionModule, MdMenuModule, MdProgressSpinnerModule
} from '@angular/material';

import { AppComponent } from './app.component'

import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { environment } from '../environments/environment'

// import { initializeApp } from 'firebase/app'
import { AuthService } from './services/auth.service'
import { AuthComponent } from './components/auth/auth.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'

import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { CommentComponent } from './components/comment/comment.component'
import { FeedCreateComponent } from './components/feed-create/feed-create.component'
import { CommentCreateComponent } from './components/comment-create/comment-create.component'
import { FeedsListComponent }       from './components/feeds-list/feeds-list.component'
import { FeedDetailComponent }      from './components/feeds-list/feed-detail/feed-detail.component'
import { FeedDeleteComponent }      from './components/feeds-list/feed-detail/feed-delete/feed-delete.component'
import { FeedUpdateLikesComponent } from './components/feeds-list/feed-detail/feed-update-likes/feed-update-likes.component'

// initializeApp(environment.firebase);

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        FeedsListComponent,
        ToolbarComponent,
        CommentComponent,
        FeedCreateComponent,
        CommentCreateComponent,
        FeedDetailComponent,
        FeedDeleteComponent,
        FeedUpdateLikesComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        MdCardModule,
        MdToolbarModule,
        MdButtonModule,
        MdDatepickerModule,
        MdInputModule,
        MdIconModule,
        MdListModule,
        MdExpansionModule,
        MdMenuModule,
        InfiniteScrollModule,
        MdProgressSpinnerModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
