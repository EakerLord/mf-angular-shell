import { HttpInterceptorFn } from '@angular/common/http';

export const hostInterceptor: HttpInterceptorFn = (req, next) => {
  const apiHost = 'http://localhost:4200';
  let newReq = req;
  if (!req.url.startsWith('http')) {
    newReq = req.clone({ url: apiHost + req.url });
  }
  console.log('Intercepted by hostInterceptor');
  return next(newReq);
};
