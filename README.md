# K6-examples

This repository contains example k6 scripts based on a Udemy course. The scripts demonstrate various types of load testing and k6 features.

## Structure
- `section1-intro/`: Basic k6 script examples
- `Section2-k6-test-types/`: Different types of load tests (smoke, load, stress, spike, soak, breakpoint)
- `Section3-creating-test-scripts/`: Advanced scripting (custom metrics, tags, groups, aborting tests, scenarios, etc.)
- `Section4-BuildingAPIs/`: (Reserved for API testing examples)

## Running the Tests
1. Install [k6](https://k6.io/docs/getting-started/installation/).
2. Run a script using:
   ```sh
   k6 run path/to/script.js
   ```
   For example:
   ```sh
   k6 run Section3-creating-test-scripts/abort.js
   ```

## Notes
- Update URLs in scripts as needed for your environment.
- Scripts are for educational purposes and can be adapted for real-world testing.

## Additional Resources
- [k6 OSS Workshop](https://github.com/grafana/k6-oss-workshop?tab=readme-ov-file) - a K6 workshop with examples
- [test-api.k6.io](https://github.com/grafana/test-api.k6.io?tab=readme-ov-file) - this repo is deprecated but is used in section 4 of these scripts.
- [A Quick Start Guide to Learning Performance Testing](https://www.ministryoftesting.com/articles/a-quick-start-guide-to-learning-performance-testing) - This article is focused on general performance testing concepts and is not specific to k6.
