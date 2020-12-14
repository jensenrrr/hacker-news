import { Component, Input, OnInit } from '@angular/core';
import HackerNewsStory from '../Interfaces/HackerNewsStory';

@Component({
  selector: 'app-hacker-news-card',
  templateUrl: './hacker-news-card.component.html',
  styleUrls: ['./hacker-news-card.component.css'],
})
export class HackerNewsCardComponent {
  @Input() story: HackerNewsStory = {
    by: 'Jensen Rice',
    title: 'No data was passed to this component',
    url: 'url',
    time: 5,
    score: 6,
    descendants: 2,
  };
}
/*
export class HackerNewsCardComponent implements OnInit {
  constructor() {
    @Input() story: HackerNewsStory;

  }
  @Input() story: HackerNewsStory;
  story: HackerNewsStory = {
    by: 'Jensen Rice',
    title: 'No data was passed to this component',
    url: 'url',
    time: 5,
    score: 6,
    descendants: 2,
  };
  ngOnInit(): void {}
}
*/
