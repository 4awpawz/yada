<!-- <br> -->
<!-- <br> -->
<!-- <div align=center> -->
<!--     <img src="github/readmeheader.png" alt="README Header"> -->
<!-- </div> -->
<!-- <br> -->
<!-- <hr color="grey"> -->
<!-- <br> -->

# Minimal SSG Framework For Building Static Websites

HTML, Markdown, Front Matter + Custom `.tsx` Components.

## The Name

_fusion_ plays on the idea of **_fusing_** together various elements (HTML, Markdown, TypseScript components, JSON data, YAML front matter, etc.).

## Features

- Simple HTML document creation using Pages, Templates and Includes.
- Simple token replacement involving front matter property values and matching property names in HTML.
- TSX custom component compilation and sand-boxed execution.
- Document hydration using Typescript components and JSON data sources.
- Page collections using Typescript components and JSON data sources.
- Base URLs.
- Development and release builds.
- Content posting (e.g. Blogging).
  - Tags.
  - Categories.
- Works in progress.
  - Individual files.
  - Folders.
  - Ignored.

## Project Development

The project is written in ` TypeScript` (no excuses, _it just works beautifully_) and runs on `Node`.

## Project Scope
The project's scope is limited to generating robust and resilient HTML documents and nothing else. It will not provide any other tooling other than what is absolutely necessary to accomplish that. Importantly, fusion.ssg requires no knowledge of front-end frameworks like React. This keeps the scope of the project focused, preventing feature creep, and benefits users who will be able to pick and chose their own tools.

## Current Status

The project is still in its Alpha/prerelease stage. One or more _Beta releases_ will follow and both Alpha and Beta releases should be considered _unstable_ and _transient_. While in Beta, features and implementations might change dramatically and this should be considered the norm.

## Versioning

fusion will use [semantic versioning](https://semver.org/) and will distinguish between _development_ builds and _release_ builds by their major version numbers
  1. Odd major version number are to be considered development versions.
  1. Even major version number are to be considered release versions.

### What Has Already Been Implemented

- [X] Support for _simple HTML document creation_ using _Pages, Templates and Includes_.
- [X] Support for _simple token replacement_ involving _front matter property values_ and _matching property names_ in HTML.
- [X] Support for Typescript _`.tsx` components_, _compilation_ and _sand-boxed execution_.
- [X]  Support for _document hydration_ using Typescript components and JSON data sources.
- [X] Support for generating _collections of pages_ using Typescript components and JSON data sources.
- [X] Support for base URLs.
- [X] Support for development and release builds.
- [X]  Support for content posting (e.g. Blogging).
  - [X] Support for tags.
  - [X] Support for categories.
- [X] Work in progress templates.
  - [X] Individual files.
  - [X] Folders.
  - [X] Ignored.
- [X] End-User project generation.

### What Still Remains To Be Done

- Logo... fusion.ssg is desperately in need of a great logo.
- Project documentation website - _currently under development_.
- Encourage early community involvement and adoption.
- Provide sufficient testing to reduce the likelihood of introducing regressions.

### Longer Term Goals

- Seek RFC.
- Accept pull requests when the codebase is stable enough to receive them, which will probably coincide with the first major Alpha release.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discuss _fusion.ssg _on Github](https://github.com/4awpawz/fusion.ssg/discussions)

For casual conversation with others about using _fusion.ssg_:

[Discuss _fusion.ssg on Twitter and other social media.](https://twitter.com).

## And If You Wouldn't Mind

Please consider 👀watching and 🌟starring this repo as these will provide the motivation to keep moving forward.
