import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

import { SweatService } from '../shared/sweat.service';
import { ISweat } from '../shared/sweat.model';
import { CITY_COLLECTION } from '../shared/mock-cities';


@Component({
  selector: 'app-create-sweat',
  templateUrl: './create-sweat.component.html',
  styleUrls: ['./create-sweat.component.css']
})
export class CreateSweatComponent implements OnInit {
  newSweatForm: FormGroup;
  name: FormControl;
  content: FormControl;
  image: FormControl;
  lat: FormControl;
  lon: FormControl;
  city: FormControl;
  locationSelection: FormControl;

  mockCities = CITY_COLLECTION;
  locationEntryType = true;
  selectedCity = {
    city: '', lat: '', lon: ''
  };
  base64textString: string;
  showLoadingIndicator = true;

  constructor(
    private sweatService: SweatService,
    private router: Router
  ) {
    this.router.events.subscribe(((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }
    }));
  }

  ngOnInit() {
    this.name = new FormControl('');
    this.content = new FormControl('', Validators.required);
    this.image = new FormControl('');
    this.city = new FormControl('');
    this.lat = new FormControl('', Validators.required);
    this.lon = new FormControl('', Validators.required);

    this.newSweatForm = new FormGroup({
      name: this.name,
      content: this.content,
      image: this.image,
      city: this.city,
      lat: this.lat,
      lon: this.lon,
    });
  }

  saveSweat(formValues) {
    const locdatas = [];

    for (let i = 1; i <= 12; i++) {
      locdatas.push({
        // tslint:disable-next-line:radix
        x: this.lat2tile(parseInt(formValues.lat), i),
        // tslint:disable-next-line:radix
        y: this.long2tile(parseInt(formValues.lon), i),
        z: i
      });
    }

    const sweat: ISweat = {
      body: formValues.content,
      lat: formValues.lat,
      lon: formValues.lon,
      locDatas: locdatas,
      img: this.base64textString,
      owner: formValues.name
    };

    this.sweatService.post('send', sweat)
      .subscribe(res => {
      console.log('Success!');
      console.log(sweat);
    },
    err => {
      console.log('Post Error');
      console.log(err.status);
      console.log(err);
      }
    );
    this.navigateHome();
  }

  long2tile(lon, zoom) {
    return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
  }

  lat2tile(lat, zoom) {
    return Math.floor(
      ((1 -
        Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) /
        2) *
        Math.pow(2, zoom)
    );
  }

  validateContent() {
    return this.content.valid || this.content.untouched;
  }

  validateLat() {
    return this.lat.valid || this.lat.untouched;
  }

  validateLon() {
    return this.lon.valid || this.lon.untouched;
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.base64textString = 'data:image/jpeg;base64,' + btoa(e.target.result);
    console.log(this.base64textString);
  }

  cancel() {
    this.navigateHome();
  }

  onCityChange(selectedCity) {
    this.selectedCity = selectedCity;
  }

  setType(bool) {
    this.locationEntryType = bool;
  }

  navigateHome() {
    setTimeout(() => {
      this.router.navigate(['/sweats']);
    }, 3000);
  }
}
