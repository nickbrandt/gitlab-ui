# [9.3.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.6...v9.3.0) (2020-02-04)


### Features

* update size prop to match ds ([ec1400f](https://gitlab.com/gitlab-org/gitlab-ui/commit/ec1400f49f311463919630da6015b8ea0a8f60ef))

## [9.2.6](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.5...v9.2.6) (2020-01-31)


### Bug Fixes

* Make classes for gl-filtered-search-suggestion more specific in order to override styles in GitLab ([d475389](https://gitlab.com/gitlab-org/gitlab-ui/commit/d4753891600e6c7ba89f45581b757b207f09fb44))

## [9.2.5](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.4...v9.2.5) (2020-01-31)


### Reverts

* fix(bootstrap-vue): Upgrade bootstrap-vue ([f20c5e1](https://gitlab.com/gitlab-org/gitlab-ui/commit/f20c5e1006fe95e5687621956d6d15fc776a6c3d))

## [9.2.4](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.3...v9.2.4) (2020-01-30)


### Bug Fixes

* **bootstrap-vue:** Upgrade bootstrap-vue to 2.3.0 ([d531986](https://gitlab.com/gitlab-org/gitlab-ui/commit/d5319865534f6e496f2255b1d3591352c6e5bb60))

## [9.2.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.2...v9.2.3) (2020-01-29)


### Bug Fixes

* add @gitlab/svgs to peerDependencies ([00381c2](https://gitlab.com/gitlab-org/gitlab-ui/commit/00381c285d557142e4569b7d4e03d28478896237))

## [9.2.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.1...v9.2.2) (2020-01-28)


### Bug Fixes

* Help text font size being overridden ([3bb7d41](https://gitlab.com/gitlab-org/gitlab-ui/commit/3bb7d4199edf93999a3a46767fe943b3c6a63526))

## [9.2.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.2.0...v9.2.1) (2020-01-28)


### Bug Fixes

* **popover:** Expose popover event listeners ([684c786](https://gitlab.com/gitlab-org/gitlab-ui/commit/684c7862bdac3f38edf05ba5ef2dcc533202b44d))

# [9.2.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.1.0...v9.2.0) (2020-01-28)


### Features

* **filtered_search:** Implement static binary token ([591ced0](https://gitlab.com/gitlab-org/gitlab-ui/commit/591ced08a21be587cf8ac7ac3395d859c2721511))

# [9.1.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.0.2...v9.1.0) (2020-01-28)


### Features

* Add Collapse component ([6be57d0](https://gitlab.com/gitlab-org/gitlab-ui/commit/6be57d07628b717b65f4df51a477ca577d2d068a))
* **sprintf:** Allow full sentence interpolation ([af82918](https://gitlab.com/gitlab-org/gitlab-ui/commit/af82918633eaf19d40ea2da36e98401496f6e27a)), closes [/gitlab.com/gitlab-org/gitlab/issues/21344#note_221778896](https://gitlab.com//gitlab.com/gitlab-org/gitlab/issues/21344/issues/note_221778896)

## [9.0.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.0.1...v9.0.2) (2020-01-24)


### Bug Fixes

* **broadcast message:** adjust vertical spacing ([82d5cca](https://gitlab.com/gitlab-org/gitlab-ui/commit/82d5cca46526f6c2118e113edca9ea04e173b432))

## [9.0.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v9.0.0...v9.0.1) (2020-01-24)


### Bug Fixes

* Enhance daterange_picker range selection ([fa2c4c1](https://gitlab.com/gitlab-org/gitlab-ui/commit/fa2c4c1cbc0fbc4c3b4744c31b63470322f120e7))

# [9.0.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.21.0...v9.0.0) (2020-01-23)


### Code Refactoring

* Upgrade BootstrapVue to 2.1.0 ([6d6ef5b](https://gitlab.com/gitlab-org/gitlab-ui/commit/6d6ef5bfaade2dc13f86f5f27311aaaebef2df69))


### BREAKING CHANGES

* Upgrade bootstrap-vue dependency to version 2.1.0. This
upgrade contains the following breaking changes:

- Import statements for bootstrap-vue components changed.
- BTable component has a new slot syntax for custom content.
- BTabs component has a new slot syntax for contentless tabs
- BPopover and BTooltip components were completely rewritten

For more information about this upgrade, check BootstrapVue changelog
page https://bootstrap-vue.js.org/docs/misc/changelog

# [8.21.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.20.0...v8.21.0) (2020-01-23)


### Features

* **avatars:** Detach collapsed state from badge ([a24270b](https://gitlab.com/gitlab-org/gitlab-ui/commit/a24270bcae6ca70cfe0fb651c9a9aa5349f7933d))

# [8.20.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.19.1...v8.20.0) (2020-01-23)


### Features

* **color:** adding $purple color variables ([9310e3f](https://gitlab.com/gitlab-org/gitlab-ui/commit/9310e3f0d48e32ab3fcfb83cbfe628ced2f95988))

## [8.19.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.19.0...v8.19.1) (2020-01-22)


### Bug Fixes

* **avatars-inline:** Fix collapsible behavior ([bb60fdb](https://gitlab.com/gitlab-org/gitlab-ui/commit/bb60fdb2a8c23982467ccfabfaf85d93ea865d36))

# [8.19.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.18.0...v8.19.0) (2020-01-21)


### Features

* Introduce new modal API ([65d8135](https://gitlab.com/gitlab-org/gitlab-ui/commit/65d81352be7f42256b3f27a52b8b90b5a4a80d6a))

# [8.18.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.17.0...v8.18.0) (2020-01-20)


### Bug Fixes

* Tooltip on Label for gitlab ([10a9507](https://gitlab.com/gitlab-org/gitlab-ui/commit/10a95070d63ad11b51e02eb115a5b92ca120bdd6))


### Features

* update button props ([95f971c](https://gitlab.com/gitlab-org/gitlab-ui/commit/95f971c1be00045769ea91281e1967951efbed76))

# [8.17.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.16.0...v8.17.0) (2020-01-17)


### Features

* **filtered_search:** Implement filtered search binary token ([6b14c21](https://gitlab.com/gitlab-org/gitlab-ui/commit/6b14c21077cf60f601c715baa4b943e2b278327d))

# [8.16.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.15.0...v8.16.0) (2020-01-16)


### Features

* Inline avatars component ([688feba](https://gitlab.com/gitlab-org/gitlab-ui/commit/688febaf7cdb145165042a06a2b2fab8d7ad2f11))

# [8.15.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.14.0...v8.15.0) (2020-01-14)


### Features

* **filtered_search:** Implement filtered search term ([1d0bc82](https://gitlab.com/gitlab-org/gitlab-ui/commit/1d0bc82f3e74159e9572ba96a8af60ab701fc860))

# [8.14.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.13.0...v8.14.0) (2020-01-14)


### Features

* add broadcast message component ([aaf98e6](https://gitlab.com/gitlab-org/gitlab-ui/commit/aaf98e65aa01bc3607069eaa9b0d3209f02e680e))

# [8.13.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.12.0...v8.13.0) (2020-01-10)


### Features

* **filtered_search:** Implement filtered search suggestions ([8b67b12](https://gitlab.com/gitlab-org/gitlab-ui/commit/8b67b12313df23a3b576f4f6f5a8d7a95d682631))

# [8.12.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.11.0...v8.12.0) (2020-01-10)


### Features

* Add Input Group component ([16fa807](https://gitlab.com/gitlab-org/gitlab-ui/commit/16fa807113dc0faf847577e5e0b8953e3d940537))

# [8.11.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.10.0...v8.11.0) (2020-01-09)


### Bug Fixes

* prevent text prop when icon/split are used ([ad5e9ec](https://gitlab.com/gitlab-org/gitlab-ui/commit/ad5e9ec59c23d89638d5552558ec3edb91b96f5d))
* Set current year to fixed value ([789b612](https://gitlab.com/gitlab-org/gitlab-ui/commit/789b612487a987f5be2f45449461b2596b804812))


### Features

* Add icon and split to new dropdown ([b9dc446](https://gitlab.com/gitlab-org/gitlab-ui/commit/b9dc446c040e00008d47df28babf629e33f5a404))
* **search:** Add tooltip container support for search components ([2ce9b7c](https://gitlab.com/gitlab-org/gitlab-ui/commit/2ce9b7c22e8edf152ea1a67101e3d6dd585c894e))

# [8.10.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.9.0...v8.10.0) (2019-12-30)


### Features

* Export breakpoints from utils ([b6e4ace](https://gitlab.com/gitlab-org/gitlab-ui/commit/b6e4ace54fec274e0de213c030eb42af1b0306a4))

# [8.9.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.8.1...v8.9.0) (2019-12-20)


### Features

* update dropdown examples ([ba6d9d7](https://gitlab.com/gitlab-org/gitlab-ui/commit/ba6d9d7b52bad22687db9f95b97eb06e37aebb8a))

## [8.8.1](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.8.0...v8.8.1) (2019-12-20)


### Bug Fixes

* Fix empty tooltip on sparklines ([a74c6e1](https://gitlab.com/gitlab-org/gitlab-ui/commit/a74c6e169d73b1ca15e64ed23a0a557ebae9fda6))

# [8.8.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.7.0...v8.8.0) (2019-12-17)


### Features

* Add xported utils ([1d35af2](https://gitlab.com/gitlab-org/gitlab-ui/commit/1d35af230a741503162e1f295e9737fcac597d4c))

# [8.7.0](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.6.3...v8.7.0) (2019-12-17)


### Features

* Init card component ([783121d](https://gitlab.com/gitlab-org/gitlab-ui/commit/783121dcb68a7d6d6b28b09ba29869de6610df46))

## [8.6.3](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.6.2...v8.6.3) (2019-12-16)


### Bug Fixes

* **search:** fix search components with gitlab CSS ([4c65fdd](https://gitlab.com/gitlab-org/gitlab-ui/commit/4c65fdd1485a0eb7f18eca09903309e8f34e60f0))

## [8.6.2](https://gitlab.com/gitlab-org/gitlab-ui/compare/v8.6.1...v8.6.2) (2019-12-13)


### Reverts

* feat: add and style badges ([b78b497](https://gitlab.com/gitlab-org/gitlab-ui/commit/b78b4976d2e47e4d7c37393d460fc134c07edbf6))
