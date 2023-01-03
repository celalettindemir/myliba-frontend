import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "@env/environment";

export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Get the request url
    let requestUrl = req.url;
    // if the request URL have the string prefix,
    // then make the replace by the correct url
    if (requestUrl.indexOf(`@api-x`) !== -1) {
      requestUrl = requestUrl.replace(`@api-x`, environment.apiUrl);
    }
    // clone the http request
    req = req.clone({
      url: requestUrl
    });
    // move to next HttpClient request life cycle
    return next.handle(req);
  }
}
