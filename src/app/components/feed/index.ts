import { Component } from '@angular/core'

export { FeedsListComponent } from './list/list'
export { FeedDetailComponent } from './detail/detail'
export { FeedDeleteComponent } from './delete/delete'
export { FeedUpdateLikesComponent } from './update-likes/update-likes'

export { FeedService } from './feed.service'

@Component({
  selector: 'app-feed',
  template: '<app-feeds-list></app-feeds-list>'
})
export class FeedComponent { }
