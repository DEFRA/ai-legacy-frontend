# ai-legacy-frontend

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_ai-legacy-frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=DEFRA_ai-legacy-frontend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_ai-legacy-frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=DEFRA_ai-legacy-frontend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_ai-legacy-frontend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=DEFRA_ai-legacy-frontend)

Core delivery platform Node.js Frontend Template for TB Case Management System (TBCMS).

- [Requirements](#requirements)
  - [Node.js](#nodejs)
- [TB Case Management System](#tb-case-management-system)
  - [Features](#features)
  - [TB Case Form Pages](#tb-case-form-pages)
- [Development Standards](#development-standards)
  - [JavaScript Conventions](#javascript-conventions)
  - [Testing](#testing)
- [Server-side Caching](#server-side-caching)
- [Redis](#redis)
- [Local Development](#local-development)
  - [Setup](#setup)
  - [Development](#development)
  - [Production](#production)
  - [Npm scripts](#npm-scripts)
  - [Update dependencies](#update-dependencies)
  - [Formatting](#formatting)
    - [Windows prettier issue](#windows-prettier-issue)
- [Docker](#docker)
  - [Development image](#development-image)
  - [Production image](#production-image)
  - [Docker Compose](#docker-compose)
  - [Dependabot](#dependabot)
  - [SonarCloud](#sonarcloud)
- [Licence](#licence)
  - [About the licence](#about-the-licence)

## Requirements

### Node.js

Please install [Node.js](http://nodejs.org/) `>= v22.13.1` and [npm](https://nodejs.org/) `>= v9`. You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
cd ai-legacy-frontend
nvm use
```

## TB Case Management System

This application implements a comprehensive TB Case Management System (TBCMS) for managing tuberculosis cases in livestock. The system follows Government Digital Service (GDS) design patterns and accessibility standards.

### Features

- **Case Management**: Track and manage TB cases with detailed case information
- **CPH Search**: Search for holdings using County Parish Holding (CPH) numbers
- **Multi-tab Interface**: Organized tabs for different aspects of case management
- **GDS Compliance**: All pages follow GDS design system guidelines
- **Accessibility**: WCAG 2.1 AA compliant with proper semantic HTML
- **Modern Frontend**: Built with Hapi.js, Nunjucks templates, and GDS components

### CPH Search

The CPH Search functionality allows users to search for holdings using their County Parish Holding (CPH) numbers:

- **Format validation**: CPH numbers must be in format XX/XXX/XXXX (e.g., 12/123/1234)
- **Real-time search**: Submit search queries to the backend API
- **Error handling**: Comprehensive error handling for invalid formats and missing holdings
- **Accessible form**: Fully keyboard navigable with proper semantic HTML
- **Link to creation**: When no CPH is found, users are prompted to create a new one

The search page includes:
- Input field with validation and helpful hints
- Clear error messages following GDS standards
- Detailed holding information display when found
- Proper breadcrumb navigation
- Responsive design for all screen sizes

### TB Case Form Pages

The system includes the following TB Case Form tabs, each implementing specific functionality:

| Page               | Description                               | Features                                       |
| ------------------ | ----------------------------------------- | ---------------------------------------------- |
| **Case Details**   | Main case information and overview        | Case summary, basic details                    |
| **Allocations**    | Manage case allocations and assignments   | Calendar widget, allocation tracking, comments |
| **Removals**       | Handle case removals and processing       | Removal tracking, batch operations             |
| **Cons**           | Confirm and validate case information     | Confirmation workflows, validation             |
| **DRFs**           | Data Recording Forms management           | Form tracking, comments, document handling     |
| **Eartags**        | Livestock eartag management               | Tag tracking, validation, batch operations     |
| **GIS**            | Geographic Information System integration | Mapping, location data, spatial analysis       |
| **Post-Kill**      | Post-mortem case processing               | Results recording, follow-up actions           |
| **Tracings**       | Contact tracing and investigation         | Trace tracking, investigation workflows        |
| **Radial Testing** | Radial testing management                 | Test scheduling, results, analysis             |
| **Views**          | Case visualization and reporting          | Data views, reports, export functionality      |

All pages include:

- **Tools section** with administrative functions
- **Close form** button for navigation
- **Proper form validation** and error handling
- **Accessibility features** including proper labeling and hints
- **GDS components** for consistent user experience

## Development Standards

### JavaScript Conventions

This project follows strict JavaScript conventions to maintain code quality and consistency:

- **Named functions over arrow functions**: All functions use the `function` keyword instead of arrow functions
- **Kebab-case filenames**: All file names use kebab-case convention (e.g., `case-details.js`)
- **ES Modules**: All imports/exports use ES Module syntax
- **JSDoc documentation**: All functions and classes include comprehensive JSDoc comments
- **Request validation**: All route handlers validate input parameters
- **Single responsibility**: Each function has one clear purpose
- **Maximum 3 parameters**: Functions accept no more than three parameters
- **No barrel exports**: Avoid index.js files that only re-export from other files
- **Immutable code patterns**: Write code that avoids mutation where possible

### Testing

- **Vitest**: Uses Vitest as the testing framework for fast, modern JavaScript testing
- **Behavior coverage**: Focus on testing behavior rather than achieving line coverage targets
- **Test-Driven Development (TDD)**: Follow TDD principles when developing new features
- **Test commands**:
  ```bash
  npm test           # Run all tests with coverage
  npm run test:watch # Run tests in watch mode
  ```

## Server-side Caching

We use Catbox for server-side caching. By default the service will use CatboxRedis when deployed and CatboxMemory for
local development.
You can override the default behaviour by setting the `SESSION_CACHE_ENGINE` environment variable to either `redis` or
`memory`.

Please note: CatboxMemory (`memory`) is _not_ suitable for production use! The cache will not be shared between each
instance of the service and it will not persist between restarts.

## Redis

Redis is an in-memory key-value store. Every instance of a service has access to the same Redis key-value store similar
to how services might have a database (or MongoDB). All frontend services are given access to a namespaced prefixed that
matches the service name. e.g. `my-service` will have access to everything in Redis that is prefixed with `my-service`.

If your service does not require a session cache to be shared between instances or if you don't require Redis, you can
disable setting `SESSION_CACHE_ENGINE=false` or changing the default value in `~/src/config/index.js`.

## Proxy

We are using forward-proxy which is set up by default. To make use of this: `import { fetch } from 'undici'` then because of the `setGlobalDispatcher(new ProxyAgent(proxyUrl))` calls will use the ProxyAgent Dispatcher

If you are not using Wreck, Axios or Undici or a similar http that uses `Request`. Then you may have to provide the proxy dispatcher:

To add the dispatcher to your own client:

```javascript
import { ProxyAgent } from 'undici'

return await fetch(url, {
  dispatcher: new ProxyAgent({
    uri: proxyUrl,
    keepAliveTimeout: 10,
    keepAliveMaxTimeout: 10
  })
})
```

## Local Development

### Setup

Install application dependencies:

```bash
npm install
```

### Development

To run the application in `development` mode run:

```bash
npm run dev
```

### Production

To mimic the application running in `production` mode locally run:

```bash
npm start
```

### Npm scripts

All available Npm scripts can be seen in [package.json](./package.json)
To view them in your command line run:

```bash
npm run
```

### Update dependencies

To update dependencies use [npm-check-updates](https://github.com/raineorshine/npm-check-updates):

> The following script is a good start. Check out all the options on
> the [npm-check-updates](https://github.com/raineorshine/npm-check-updates)

```bash
ncu --interactive --format group
```

### Formatting

#### Windows prettier issue

If you are having issues with formatting of line breaks on Windows update your global git config by running:

```bash
git config --global core.autocrlf false
```

## Docker

### Development image

Build:

```bash
docker build --target development --no-cache --tag ai-legacy-frontend:development .
```

Run:

```bash
docker run -p 3000:3000 ai-legacy-frontend:development
```

### Production image

Build:

```bash
docker build --no-cache --tag ai-legacy-frontend .
```

Run:

```bash
docker run -p 3000:3000 ai-legacy-frontend
```

### Docker Compose

A local environment with:

- Localstack for AWS services (S3, SQS)
- Redis
- MongoDB
- This service.
- A commented out backend example.

```bash
docker compose up --build -d
```

### Dependabot

We have added an example dependabot configuration file to the repository. You can enable it by renaming
the [.github/example.dependabot.yml](.github/example.dependabot.yml) to `.github/dependabot.yml`

### SonarCloud

Instructions for setting up SonarCloud can be found in [sonar-project.properties](./sonar-project.properties).

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
