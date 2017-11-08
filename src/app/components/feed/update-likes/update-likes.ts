import { Component, Input } from '@angular/core'
import { FeedService } from '../feed.service'

@Component({
    selector   : 'app-feed-update-likes',
    templateUrl: './update-likes.html'
})
export class FeedUpdateLikesComponent {
    @Input() feed

    constructor(protected feedService: FeedService) { }
}
