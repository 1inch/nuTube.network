import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from './navigation.service';
import {Location} from '@angular/common';
import {Web3Service} from '../utils/web3.service';
import {faArrowLeft, faVideo} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  backIcon = faArrowLeft;
  publishIcon = faVideo;

  constructor(
    private location: Location,
    public navigationService: NavigationService,
    private route: ActivatedRoute,
    private router: Router,
    private web3Service: Web3Service
  ) {
  }

  ngOnInit() {
  }

  goBack() {
    this.navigationService.showBackButton = false;
    this.router.navigate(['../']);
  }
}
