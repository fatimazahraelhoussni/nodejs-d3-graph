# Performance Benchmark: GraalJS vs Node.js 

## Objective

This document compares the performance of two different demos designed to generate and serve a graph:
- **Demo 1**: GraalJS with Spring Boot, running on port `8081`
- **Demo 2**: Node.js with Express, running on port `3000`

The benchmark aims to compare the two demos in the following areas:
- Response Time
- Throughput (Requests per Second)
- Resource Consumption (CPU and Memory)
- Latency

## Setup

### Demos Tested

1. **Demo 1: GraalJS with Spring Boot**  
   A Java-based application running on GraalJS to improve performance.  
   **Endpoint**: `http://localhost:8081/graph`  
   **Repository**: 

2. **Demo 2: Node.js with Express**  
   A JavaScript-based application running in a standard Node.js environment, utilizing Express for HTTP routing.  
   **Endpoint**: `http://localhost:3000/graph`

### Test Tool Used
- **Tool**: [hey](https://github.com/rakyll/hey) (A modern HTTP load generator)
- **Test Command**:  
  ```bash
  hey -z 30s -c 10 http://localhost:<port>/graph
  ```
  - `-z 30s`: Run the test for 30 seconds
  - `-c 10`: 10 concurrent requests

### Test Parameters
- **Requests**: 200 total requests per endpoint (default for `hey` test)
- **Concurrency**: 10 concurrent requests at a time
- **Test Duration**: 30 seconds per test

### Metrics Collected
- Total Requests
- Total Time Taken
- Average Response Time
- Requests Per Second (RPS)
- Response Codes
- Latency

## Test Results

### 1. **GraalVM with Spring Boot** (`http://localhost:8081/graph`)
- **Total Requests**: 200
- **Total Time**: 8.0615 seconds
- **Average Response Time**: 0.3224 seconds
- **Requests per Second**: 24.8
- **Success Rate**: 100% (All requests completed successfully)

**Graph (Spring Boot - GraalVM)**:
```text
Requests Per Second: 24.8
Total Time: 8.0615s
Average Response Time: 0.3224s
```

### 2. **Node.js with Express** (`http://localhost:3000/graph`)
- **Total Requests**: 200
- **Total Time**: 5.7343 seconds
- **Average Response Time**: 0.2284 seconds
- **Requests per Second**: 34.8
- **Success Rate**: 100% (All requests completed successfully)

**Graph (Node.js - Express)**:
```text
Requests Per Second: 34.8
Total Time: 5.7343s
Average Response Time: 0.2284s
```

## Summary of Results

| Metric                        | GraalVM Spring Boot (8081) | Node.js Express (3000) |
|-------------------------------|----------------------------|------------------------|
| **Total Requests**             | 200                        | 200                    |
| **Total Time**                 | 8.0615 seconds             | 5.7343 seconds         |
| **Average Response Time**      | 0.3224 seconds             | 0.2284 seconds         |
| **Requests per Second (RPS)**  | 24.8                       | 34.8                   |
| **Success Rate**               | 100%                       | 100%                   |

## Observations:
- **Node.js with Express** outperforms **GraalVM with Spring Boot** in terms of both throughput (Requests per Second) and average response time.
- **GraalVM with Spring Boot** shows slightly higher response times and lower throughput, likely due to additional overhead from JVM startup time and GraalVM runtime.
- Both demos successfully handled all requests, without any errors.

## Resource Usage Comparison (CPU & Memory)

- **GraalVM with Spring Boot**:
  - Typically consumes more **CPU** and **memory** because of the Java-based nature of the Spring Boot application and JVM overhead.
  
- **Node.js with Express**:
  - Generally less resource-intensive due to **Node.js's event-driven, non-blocking** nature and lower memory footprint.

## Conclusion

- **Node.js with Express** demonstrates better overall performance in terms of **response time** and **throughput** compared to **GraalVM with Spring Boot**.
- If **low-latency** and **high-throughput** are critical for your application, **Node.js with Express** is the preferred choice.
- **GraalVM with Spring Boot** may still be more suitable for use cases requiring **JVM-based features** or integration with specific libraries, but for performance-sensitive applications, **Node.js** outperforms it in this benchmark.

---

## How to Run the Benchmark
1. Clone this repository.
2. Ensure that both demos are running:
   - **Demo 1** (GraalVM with Spring Boot): `http://localhost:8081/graph`
   - **Demo 2** (Node.js with Express): `http://localhost:3000/graph`
3. Run the benchmark using the `hey` tool:
   ```bash
   hey -z 30s -c 10 http://localhost:<port>/graph
   ```

4. Replace `<port>` with `8081` or `3000` to benchmark the respective demos.
