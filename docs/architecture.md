# Microfrontends Architecture

This application is designed following the microfrontends paradigm. Each functional domain is implemented as an independent microfrontend, using [Module Federation](https://webpack.js.org/concepts/module-federation/) for dynamic integration of Angular modules.

## Key Features

- **Remote module loading** (Remote Module Federation)
- **Independent deployment** for each microfrontend
- **Communication between microfrontends** via custom events and shared services
- **Integration with Nx**

## Structure

- `/mf-angular-shell`: Main microfrontend (host)
- `/mf-angular-19`: Functional microfrontend with Angular 19
- `/mf-angular-16`: Functional microfrontend with Angular 16

## Configuration files

- `/src/webpack.config.js`: Configuration of remotes apps, exposes services and shared components or modules.
- `/src/app/app.routes.ts`: Configuration of remotes apps for navigation.

> For more details, refer to the technical documentation of each microfrontend within their respective modules.
