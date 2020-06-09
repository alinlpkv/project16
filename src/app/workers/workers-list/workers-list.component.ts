import { Component, OnInit } from '@angular/core';
import { Mworker, MyWorkerDepartament } from 'src/app/shared/components/header/models/mworker.model';
import { MworkerService } from 'src/app/shared/services/mworker.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.css']
})
export class WorkersListComponent implements OnInit {
  workers: Mworker[];
  searchStr = '';


  constructor(private mworkerServise: MworkerService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      let workers = this.mworkerServise.getAll();
      console.log(workers)
      this.workers = isNullOrUndefined(await workers) ? [] : await workers;
    } catch (err) {
      console.log(err);
    }
  }

  async onDeleteById(id: number) {
    try {
      await this.mworkerServise.deleteOneById(id);
    } catch (err) {
      console.log(err);
    } finally {
      this.getData();
    }
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  onSortUp() {
    try {
      this.workers.sort(function (a, b) {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
      return this.workers;
    } catch (error) {
      console.error(error);
    }
  }

  onSortDown() {
    try {
      this.workers.sort(function (a, b) {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });
      return this.workers;
    } catch (error) {
      console.error(error);
    }
  }

  onSortUpAges() {
    try {
      this.workers.sort(function (a, b) {
        if (a.ages > b.ages) return 1;
        if (a.ages < b.ages) return -1;
        return 0;
      });
      return this.workers;
    } catch (error) {
      console.error(error);
    }
  }

  onSortDownAges() {
    try {
      this.workers.sort(function (a, b) {
        if (a.ages > b.ages) return -1;
        if (a.ages < b.ages) return 1;
        return 0;
      });
      return this.workers;
    } catch (error) {
      console.error(error);
    }
  }
}
