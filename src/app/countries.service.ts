import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocaleData, registerLocale } from 'i18n-iso-countries';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  registerCountries(): Observable<LocaleData> {
    return this.http.get<LocaleData>('http://localhost:4200/assets/langs/es.json').pipe(
      tap((lang: LocaleData) => {
        console.log(lang, typeof lang);
        registerLocale(lang)
      }));
  }
}
