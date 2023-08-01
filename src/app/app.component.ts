import { Component, OnInit } from '@angular/core';
import { LocaleData, getNames } from 'i18n-iso-countries';
import { CountriesService } from './countries.service';

export interface ICountryDisplay {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'poc-iso-countries';
  languages!: ICountryDisplay[];

  constructor(private countries: CountriesService) { }

  ngOnInit() {
    this.countries.registerCountries().subscribe({
      next: (locale: LocaleData) => {
        this.languages = this.loadCountries(locale.locale);
        console.log('Loaded', locale.locale);
      }
    });
  }

  loadCountries(lang: string): ICountryDisplay[] {
    const countries = Object.entries(getNames(lang))
      .map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map((country) => ({ name: country[1], code: country[0].toLowerCase() })) as ICountryDisplay[];
    console.log(countries);
    return countries;
  }
}
