import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm:FormGroup;
  weatherResult: any;
  constructor(private formBuilder:FormBuilder,private WeatherService:WeatherService) { }

  ngOnInit() {
    this.weatherForm = this.formBuilder.group({
      City: ["",[Validators.required, ]],
    })
  }
  
  search(){
     this.WeatherService.searchWeather(this.weatherForm.value).subscribe((data)=>{
console.log("here is data",data.result);
this.weatherResult=data.result
     })
    

  }



}