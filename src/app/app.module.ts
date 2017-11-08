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
import {
    FeedComponent, FeedsListComponent, FeedDetailComponent, FeedDeleteComponent,
    FeedUpdateLikesComponent, FeedService
} from './components/feed'

// initializeApp(environment.firebase);

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        FeedComponent,
        FeedsListComponent,
        FeedDetailComponent,
        FeedDeleteComponent,
        FeedUpdateLikesComponent,
        ToolbarComponent,
        CommentComponent,
        FeedCreateComponent,
        CommentCreateComponent
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
    providers: [AuthService, FeedService],
    bootstrap: [AppComponent]
})
export class AppModule { }
