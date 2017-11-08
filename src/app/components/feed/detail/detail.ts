import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-feed-detail',
    templateUrl: './detail.html'
})
export class FeedDetailComponent {
    @Input() feed
}
