import { Component, OnInit } from '@angular/core';
import { LogueoService } from '../services/logueo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private logueoService: LogueoService,
              private router: Router) { }

  ngOnInit() {
  }

  isAuth() {
    return this.logueoService.isAuthenticated();
  }

  onLogout() {
    this.logueoService.logout();
    this.router.navigate(['/']);
  }


}
