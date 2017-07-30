# caravan
Microservice oriented framework for user-adaptive web service.

## motivation
To provide flexible UI/UX that changes itself according to user.

## architecture
- user
  - props is static attribute
  - state is dynamic attribute

- props-loader
- state-sensor

- view
  - consists of isolated components
  - stateful
  - pluggable
  - data-driven rendering

- view-loader
  - component delivery