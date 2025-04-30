# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Support for `@deprecated` JSDoc annotations on generated types
- Automatic detection and annotation of deprecated OpenAPI operations
- Automatic detection and annotation of deprecated schema components
- Support for nested deprecated properties in complex schemas

### Changed
- Enhanced type generation to preserve deprecation information from OpenAPI specifications
- Improved JSDoc comment handling to include both deprecation notices and existing descriptions
