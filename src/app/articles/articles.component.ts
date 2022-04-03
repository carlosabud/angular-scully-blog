import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription | undefined;
  posts: ScullyRoute[] = [];

  constructor(private scully: ScullyRoutesService) {}
  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions = this.scully.available$.subscribe((posts) => {
      this.posts = posts.filter((p) => p.title);
    });
  }
}
