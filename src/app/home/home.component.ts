import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import HackerNewsStory from '../Interfaces/HackerNewsStory';
import { NewsService } from '../news.service';

const batchSize = 20;

const scrolledToBottom = () =>
  window.innerHeight + window.scrollY >= document.body.offsetHeight;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private newsService: NewsService) {}
  stories: HackerNewsStory[] = [];
  search: string = '';
  loadedStories = 0;
  searched = false;
  loading = false;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (scrolledToBottom()) {
      if (!this.searched && !this.loading) {
        this.loading = true;
        this.newsService
          .loadNewsStories(this.loadedStories, batchSize)
          .subscribe((data: any) => {
            this.stories.push(...data);
            this.loadedStories += batchSize;
            this.loading = false;
          });
      }
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.newsService
      .loadNewsStories(this.loadedStories, batchSize)
      .subscribe((data: any) => {
        this.stories.push(...data);
        this.loadedStories += batchSize;
        this.loading = false;
      });
  }

  onReset() {
    this.loading = true;
    this.loadedStories = 0;
    this.newsService
      .loadNewsStories(this.loadedStories, batchSize)
      .subscribe((data: any) => {
        this.stories = data;
        this.loadedStories += batchSize;
        this.loading = false;
      });
  }

  onSearch() {
    this.newsService.searchStories(this.search).subscribe((data: any) => {
      this.stories = data;
      this.loadedStories += batchSize;
      this.loading = false;
    });
  }
}
