import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  //private apiUrlPrefix = `${environment.baseEndpoint}`;
  formData: FormData |any;

  constructor(private http: HttpClient) {}

  /**
   * basic http post request with headers.
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @param body the contenct of the request
   * @return http json response
   */
  postFormData(url: string, body: any, params?: {}): Observable<any> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };

    if (params) {
      url += this.getParams(params);
    }

    this.formData = new FormData();
    this.toFormData(body);

    return this.http.post(url, this.formData);
  }

  putFormData(url: string, body: any, params?: {}): Observable<any> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };

    if (params) {
      url += this.getParams(params);
    }

    this.formData = new FormData();
    this.toFormData(body);

    return this.http.put(url, this.formData);
  }

  post(url: string, body: any, params?: {}): Observable<any> {
    if (params) {
      url += this.getParams(params);
    }

    return this.http.post(url, body);
  }

  put(url: string, body: any, params?: {}): Observable<any> {
    if (params) {
      url += this.getParams(params);
    }

    return this.http.put(url, body);
  }

  // get(url: string, params?: {}, options?): Observable<any> {
  //   if (params) {
  //     url += this.getParams(params);
  //   }

  //   return this.http.get(url, options);
  // }

  // delete(url, params?: {}, options?): Observable<any> {
  //   if (params) {
  //     url += this.getParams(params);
  //   }
  //   return this.http.delete(url, options);
  // }

  // SECTION Serialize Data and get full URL with Params
  // TODO Instead of adding to the URL as a query string add to an object of type query params

  // private getFullUrl(apiUrl: string) {
  //   return this.apiUrlPrefix + apiUrl;
  // }

  /**
   * Serializin arguments as a string
   * @param options object of Backend parametars to serialize
   * @return string of parameters
   */
  private getParams(args: any): string {
    if (!args) {
      return '';
    }
    let params = '?';
    Object.keys(args).forEach((key, index) => {
      params += this.optionToString(key, args[key]);
    });
    return params;
  }

  // TODO Refactor here and add recursion to get the best out of the function
  /**
   * serializing eatch option
   * @param key option key
   * @param value option value
   * @return single option serilization
   */
  private optionToString(key: string, value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    let str = '';
    if (value instanceof Array) {
      value.forEach((element, index) => {
        str += `${key}[${index}]=${element}&`;
      });
    } else if (value instanceof Object) {
      Object.keys(value).forEach((element, index) => {
        if (value instanceof Object) {
          str += this.serializeObject(value[element], `${key}[${element}]`);
        } else {
          str += `${key}[${element}]=${value[element]}&`;
        }
      });
    } else {
      str += `${key}=${value}&`;
    }
    return str;
  }

  /**
   * serializing the object keys
   * @param obj object to serialize
   */
  private serializeObject(obj: any, parentSerialized: string): string {
    let str = '';
    Object.keys(obj).forEach((key, index) => {
      const value = obj[key];
      if (value instanceof Object) {
        str += `${this.serializeObject(value, `${parentSerialized}[${key}]`)}`;
      } else {
        str += `${parentSerialized}[${key}]=${value}&`;
      }
    });
    return str;
  }

  // !SECTION

  // SECTION To FormArray functions

  // return formdata from normal object
  private toFormData(data: any, keys: string[] = [], index?: number): FormData | any {
    if (data instanceof Array) {
      data.forEach((el, i) => {
        keys.push(String(i));
        this.toFormData(el, keys, i);
        keys.splice(keys.length - 1, 1);
      });
    } else if (data instanceof Object && !data.lastModified) {
      Object.keys(data).forEach(elKey => {
        if (data[elKey] !== null && data[elKey] !== undefined) {
          keys.push(elKey);
          this.toFormData(data[elKey], keys);
          keys.splice(keys.length - 1, 1);
        }
      });
    } else {
      if (index !== null && index !== undefined) {
        this.formData.append(this.getKeys(keys) + `[${index}]`, data);
      } else {
        this.formData.append(this.getKeys(keys), data);
      }
      return this.formData;
    }
  }

  private getKeys(keys: string[]): string {
    let keysString: any;
    keys.forEach((key, i) => {
      if (i === 0) {
        keysString = key;
      } else {
        keysString = `${keysString}[${key}]`;
      }
    });
    return keysString;
  }

  // !SECTION To FormArray functions
}
