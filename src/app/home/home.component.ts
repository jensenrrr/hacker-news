import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import HackerNewsStory from '../Interfaces/HackerNewsStory';
import { NewsService } from '../news.service';

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
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (!this.searched && !this.loading) {
        this.loading = true;
        this.newsService
          .loadNewsStories(this.loadedStories)
          .subscribe((data: any) => {
            console.log('data from request:', data);
            this.stories.push(...data);
            this.loadedStories += 20;
            this.loading = false;
            console.log(this.stories);
          });
      }
    }
  }
  ngOnInit(): void {
    this.loading = true;
    this.newsService
      .loadNewsStories(this.loadedStories)
      .subscribe((data: any) => {
        console.log('data from request:', data);
        this.stories.push(...data);
        this.loadedStories += 20;
        this.loading = false;
        console.log(this.stories);
      });
  }
  onReset() {
    this.loading = true;
    this.loadedStories = 0;
    this.newsService
      .loadNewsStories(this.loadedStories)
      .subscribe((data: any) => {
        console.log('data from request:', data);
        this.stories = data;
        this.loadedStories += 20;
        this.loading = false;
        console.log(this.stories);
      });
  }
  onSearch() {
    this.newsService.searchStories(this.search).subscribe((data: any) => {
      console.log('data from search:', data);
      this.stories = data;
      this.loadedStories += 20;
      this.loading = false;
      console.log(this.stories);
    });
  }
}
