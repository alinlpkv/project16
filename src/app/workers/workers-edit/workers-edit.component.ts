import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { MworkerService } from 'src/app/shared/services/mworker.service';
import { Mworker, MyWorkerDepartament } from 'src/app/shared/components/header/models/mworker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-workers-edit',
  templateUrl: './workers-edit.component.html',
  styleUrls: ['./workers-edit.component.css']
})
export class WorkersEditComponent implements OnInit {

  id: number;
  worker: Mworker;
  myWorkerDepartament = MyWorkerDepartament;
  workerForm: FormGroup;
  now = new Date();
  ages: string;

  public maskPhone = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private activatedRoute: ActivatedRoute, private mworkerService: MworkerService, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      if (!isNullOrUndefined(params.id)) {
        this.id = +params.id;
      } else {
        this.id = null;
      }
    })

  }

  ngOnInit(): void {
    this.getData();

    this.workerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      ages: new FormControl(),
      department: new FormControl(null, [Validators.required]),
    });

  }

  async getData() {
    if (!isNullOrUndefined(this.id)) {
      try {
        let worker = this.mworkerService.getOneById(this.id);
        this.worker = await worker;
      } catch (err) {
        console.error(err);
      }
      this.workerForm.patchValue({
        name: this.worker.name,
        surname: this.worker.surname,
        patronymic: this.worker.patronymic,
        phone: this.worker.phone,
        email: this.worker.email,
        dateOfBirth: this.worker.dateOfBirth,
        //  ages: this.worker.ages,
        department: this.worker.department
      });
    }
  }

  difference(birth: string) {
    let arr = birth.split('-');
    let arrNow = this.now.toLocaleDateString().split('.');
    console.log(arr)
    console.log(arrNow)
    let year = +arrNow[2] - (+arr[0]);
    if (+arrNow[1] < +arr[1]) {
      return year-1;
    } else if (+arrNow[1] > +arr[1]) {
      return year;
    } else if (+arrNow[1] == +arr[1]) {
      if (+arrNow[0] < +arr[2]){
        return year-1;
      } else return year;
    }
  }

  async onDelete() {
    try {
      await this.mworkerService.deleteOneById(this.id);
    } catch (error) {
      console.error(error);
    }
    this.router.navigate(['/workers']);
  }

  async onSave() {
    this.workerForm.value.ages = this.difference(this.workerForm.value.dateOfBirth).toString();
    if (!isNullOrUndefined(this.id)) {
      try {
        await this.mworkerService.putOneById(this.id, this.workerForm.value);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        let result = await this.mworkerService.postOne(this.workerForm.value);

        this.router.navigate([this.router.url, result.id]);
        this.getData();
      } catch (error) {
        console.error(error);
      }
    }
    this.router.navigate(['/workers']);
  }


}
