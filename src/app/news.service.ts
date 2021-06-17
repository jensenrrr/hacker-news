import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import HackerNewsStory from './Interfaces/HackerNewsStory';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  loadNewsStories(storiesToLoad: number, storyCount: number) {
    return this.http.get<HackerNewsStory[]>(
      `https://localhost:5001/api/HackerNews/loadNewStories/${storiesToLoad}/${storyCount}`
    );
  }
  searchStories(searchTerm: string) {
    return this.http.get<HackerNewsStory[]>(
      `https://localhost:5001/api/HackerNews/searchNewStories/${searchTerm}`
    );
  }
  constructor(private http: HttpClient) {}
}
