import { Component, Input } from '@angular/core'
import { FeedService } from '../feed.service'

@Component({
    selector   : 'app-feed-delete',
    templateUrl: './delete.html'
})
export class FeedDeleteComponent {
    @Input() feedId

    constructor(protected feedService: FeedService) { }
}
