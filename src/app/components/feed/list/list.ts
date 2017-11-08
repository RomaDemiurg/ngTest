import { Component } from '@angular/core'
import { FeedService } from '../feed.service'

@Component({
    selector: 'app-feeds-list',
    templateUrl: './list.html'
})
export class FeedsListComponent {

    constructor(protected feedService: FeedService) {
        this.feedService.getNextFeeds()
    }

}
