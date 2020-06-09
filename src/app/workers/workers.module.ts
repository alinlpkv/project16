import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';
import { WorkersEditComponent } from './workers-edit/workers-edit.component';
import { WorkersListComponent } from './workers-list/workers-list.component';
import { FindWorkerPipe } from './pipes/find-worker.pipe';


@NgModule({
  declarations: [WorkersComponent, WorkersEditComponent, WorkersListComponent, FindWorkerPipe],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
  ]
})
export class WorkersModule { }
