# Performance Benchmark: GraalJS vs Node.js 

## Objective

This document compares the performance of two different services for generating and serving a graph:

- **Demo 1**: GraalJS with Spring Boot, running on port 8081
- **Demo 2**: Node.js with Express, running on port 3000

The benchmark aims to compare the performance of the two services in terms of:

- Response Time
- Throughput (requests per second)
- Resource Consumption (CPU and Memory)
- Latency

## Setup

### Demo Tested

- **Demo 1**: GraalJS-based Spring Boot Application ([http://localhost:8081/graph](http://localhost:8081/graph))
  - Java-based application running on GraalVM for improved performance.
  
- **Demo 2**: Node.js with Express Application ([http://localhost:3000/graph](http://localhost:3000/graph))
  - JavaScript-based application running on a standard Node.js environment with Express for HTTP routing.

### Test Tool Used

- **Tool**: hey (A modern HTTP load generator for benchmarking)
- **Test Command**: `hey -n 200 -c 8 http://localhost:<port>/graph`

### Test Parameters

- **Requests**: 200 total requests per endpoint
- **Concurrency**: 8 concurrent requests at a time
- **Test Duration**: 30 seconds per test

### Metrics Collected

- Total Requests
- Total Time Taken
- Average Response Time
- Requests Per Second (RPS)
- Response Codes
- Latency

## Test Results

### 1. GraalVM with Spring Boot (http://localhost:8081/graph)

- **Total Requests**: 200
- **Total Time**: 7.7557 seconds
- **Average Response Time**: 0.3102 seconds
- **Requests per Second (RPS)**: 25.79
- **Success Rate**: 100% (All requests completed successfully)

**Graph (GraalVM - Spring Boot)**:

- **Requests Per Second**: 25.79
- **Total Time**: 7.7557s
- **Average Response Time**: 0.3102s

### 2. Node.js with Express (http://localhost:3000/graph)

- **Total Requests**: 200
- **Total Time**: 0.4395 seconds
- **Average Response Time**: 0.0157 seconds
- **Requests per Second (RPS)**: 455.09
- **Success Rate**: 100% (All requests completed successfully)

**Graph (Node.js - Express)**:

- **Requests Per Second**: 455.09
- **Total Time**: 0.4395s
- **Average Response Time**: 0.0157s

## Summary of Results

| Metric                          | GraalVM Spring Boot (8081) | Node.js Express (3000) |
|---------------------------------|----------------------------|------------------------|
| **Total Requests**              | 200                        | 200                    |
| **Total Time**                  | 7.7557 seconds             | 0.4395 seconds         |
| **Average Response Time**       | 0.3102 seconds             | 0.0157 seconds         |
| **Requests per Second (RPS)**   | 25.79                      | 455.09                 |
| **Success Rate**                | 100%                       | 100%                   |

### Observations:

- **Node.js with Express** significantly outperforms **GraalVM with Spring Boot** in terms of **raw throughput (Requests per Second)** and **average response time**, indicating better performance under load.
- **GraalVM with Spring Boot** shows a higher response time and lower throughput, likely due to the overhead of the JVM and GraalVM startup time.

Both services returned all requests successfully with no errors.

## Resource Usage Comparison (CPU & Memory)

- **GraalVM with Spring Boot**: Typically consumes more memory and CPU due to the Java-based nature of the Spring Boot application.
- **Node.js with Express**: Less resource-intensive compared to GraalVM/Spring Boot due to Node.js' event-driven, non-blocking nature and lower memory footprint.

## Conclusion

- **Node.js with Express** demonstrates better overall performance in terms of both **response time** and **throughput** compared to **GraalVM with Spring Boot**.
- If low-latency and high-throughput are essential for your application, **Node.js with Express** would be the preferred choice.
- **GraalVM with Spring Boot** may still be suitable for certain use cases where JVM-based features or specific libraries are required, but for **performance-critical applications**, **Node.js** outperforms it in this benchmark.
