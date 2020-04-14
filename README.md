# Inmate Intake

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Installation

Install:

```sh
npm install
```

## Running the Solution

```sh
npm start
```

The solution uses a package called `concurrently` to run the `json-server` and the Angular Express server at the same time.

## MVP Requirement Notes

The models include an IsActive boolean flag to soft delete the entities \
To display the location history on the dashboard click the location icon on the right to expand the row.

## Solution Overview

The solution contains 4 main modules 

Core module - Single use components and singleton root services \
Shared Module - Shared components, Services and Pipes \
Home Module - Contains the dashboard component and serves as the landing page for the system \
Inmate Module - Responsible for creating and editing inmates

## JSON-Server and environment.ts

The solution is setup to use JSON-Server to stub API data. The URL of the JSON-Server is stored in the environment.ts file to allow for swapping for a real API easily in the future.