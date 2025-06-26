# ai-legacy-frontend - TB Case Management System (TBCMS)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_ai-legacy-frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=DEFRA_ai-legacy-frontend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_ai-legacy-frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=DEFRA_ai-legacy-frontend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_ai-legacy-frontend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=DEFRA_ai-legacy-frontend)

A comprehensive web application for managing tuberculosis cases in cattle, built on the Core Delivery Platform Node.js Frontend Template. This system provides veterinary officers and farm administrators with tools to track, monitor, and manage TB cases from detection through resolution.

## Features

### TB Case Management Modules

1. **Case Details** - Core case information management including keeper details, addresses, and TB status
2. **Removals** - Reactor animal removal tracking with comprehensive workflow management
3. **Eartags** - Animal identification and livestock management with import/export capabilities
4. **Tracings** - Contact tracing for epidemiological investigation and risk assessment
5. **Allocations** - Abattoir allocation management for reactor animals
6. **GIS** - Geographic Information System with mapping and spatial analysis
7. **DRFS** - Disease Reporting Forms with document management and submission tracking
8. **Cons** - Compliance monitoring and regulatory requirement tracking
9. **Radial Testing** - Surveillance testing management and scheduling
10. **Post-Kill** - Post-mortem examination tracking and results management
11. **Views** - Data visualization, reporting, and analytics dashboard

### Key Capabilities

- **Accessibility Compliant** - Fully compliant with GDS accessibility requirements
- **Responsive Design** - Mobile-first responsive design following GOV.UK Design System
- **Form Validation** - Comprehensive client and server-side validation
- **Document Management** - File upload, storage, and management for supporting documents
- **Data Export** - CSV export capabilities for data analysis and reporting
- **Search and Filter** - Advanced search and filtering across all modules
- **Audit Trail** - Complete audit logging for compliance and traceability
- **Integration Ready** - API integration points for external systems

- [Requirements](#requirements)
  - [Node.js](#nodejs)
- [TB Case Management System](#tb-case-management-system)
  - [System Overview](#system-overview)
  - [User Workflows](#user-workflows)
  - [Module Documentation](#module-documentation)
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

Please install [Node.js](http://nodejs.org/) `>= v18` and [npm](https://nodejs.org/) `>= v9`. You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
cd ai-legacy-frontend
nvm use
```

## TB Case Management System

### System Overview

The TB Case Management System (TBCMS) is a comprehensive web application designed for managing tuberculosis cases in cattle. It provides a complete workflow from initial case detection through final resolution, supporting veterinary officers, farm administrators, and regulatory authorities in their TB control activities.

### User Workflows

#### 1. New TB Case Creation

1. **Case Details** - Enter basic case information, keeper details, and TB status
2. **Eartags** - Record animal identification and livestock inventory
3. **Tracings** - Conduct contact tracing investigations
4. **Allocations** - Arrange abattoir allocations for reactor animals
5. **Removals** - Track reactor animal removals and transportation

#### 2. Ongoing Case Management

1. **GIS** - Monitor geographic risk factors and neighboring holdings
2. **Radial Testing** - Schedule and manage surveillance testing
3. **DRFS** - Complete and submit disease reporting forms
4. **Cons** - Monitor compliance with regulatory requirements
5. **Post-Kill** - Track post-mortem examination results

#### 3. Case Closure and Reporting

1. **Views** - Generate comprehensive case reports and analytics
2. **Document Management** - Archive all case-related documentation
3. **Data Export** - Export data for regulatory reporting and analysis

### Module Documentation

#### Case Details Module (`/tbcase/case-details`)

- **Purpose**: Core case information management
- **Features**: Keeper details, address management, TB status tracking, case timeline
- **Key Fields**: CPH, National Incident number, contact information, TB status, allocated officer

#### Removals Module (`/tbcase/removals`)

- **Purpose**: Reactor animal removal tracking
- **Features**: Removal scheduling, transportation tracking, destination management
- **Key Fields**: Eartag numbers, removal dates, destinations, removal methods

#### Eartags Module (`/tbcase/eartags`)

- **Purpose**: Animal identification and livestock management
- **Features**: Individual animal records, bulk import/export, testing history
- **Key Fields**: Eartag numbers, breed, date of birth, TB test results

#### Tracings Module (`/tbcase/tracings`)

- **Purpose**: Contact tracing and epidemiological investigation
- **Features**: Movement tracking, risk assessment, investigation management
- **Key Fields**: Contact holdings, movement dates, risk levels, investigation status

#### Allocations Module (`/tbcase/allocations`)

- **Purpose**: Abattoir allocation management
- **Features**: Allocation scheduling, abattoir capacity management, priority handling
- **Key Fields**: Abattoir details, allocation dates, animal counts, special requirements

#### GIS Module (`/tbcase/gis`)

- **Purpose**: Geographic information and spatial analysis
- **Features**: Interactive mapping, buffer zone management, neighbor identification
- **Key Fields**: Grid references, coordinates, risk zones, environmental factors

#### DRFS Module (`/tbcase/drfs`)

- **Purpose**: Disease Reporting Forms management
- **Features**: Form generation, document upload, submission tracking
- **Key Fields**: Form types, notification dates, laboratory references, clinical observations

#### Cons Module (`/tbcase/cons`)

- **Purpose**: Compliance monitoring and regulatory tracking
- **Features**: Requirement tracking, deadline management, violation recording
- **Key Fields**: Compliance status, deadlines, regulatory requirements, violation details

#### Radial Testing Module (`/tbcase/radial-testing`)

- **Purpose**: Surveillance testing management
- **Features**: Test scheduling, area management, result tracking
- **Key Fields**: Test areas, testing schedules, participating holdings, test results

#### Post-Kill Module (`/tbcase/post-kill`)

- **Purpose**: Post-mortem examination tracking
- **Features**: Examination scheduling, result recording, lesion documentation
- **Key Fields**: Examination dates, findings, laboratory results, lesion details

#### Views Module (`/tbcase/views`)

- **Purpose**: Data visualization and reporting
- **Features**: Dashboard analytics, custom reports, data export
- **Key Fields**: Case statistics, timeline visualization, performance metrics

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
