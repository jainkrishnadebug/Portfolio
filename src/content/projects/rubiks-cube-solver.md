---
title: Rubik's Cube Solver based on a custom two-phase algorithm
summary: A self-directed Rubik's Cube solver using an edge-first, corner-second strategy, heuristic search, and pruning.
year: 2026
tags: [algorithms, IDA*, C++]
highlights:
  - Developed an edge-first, corner-second strategy with a guarantee of solving every reachable cube configuration.
  - Implemented heuristic search using IDA* with pruning strategies for optimal cube solving.
  - Successfully solved 100,000 randomly generated cube configurations with 100% correctness.
  - Evaluated the solver against Thistlethwaite-based solvers using move count, execution time, and scalability.
featured: true
status: active
---

## Overview

This self-directed project develops a custom two-phase algorithm for solving Rubik's Cube configurations.

The solver separates edge and corner reasoning, then uses IDA* heuristic search with pruning strategies to navigate the remaining state space. It successfully solved 100,000 randomly generated configurations with 100% correctness and was evaluated against Thistlethwaite-based solvers using move count, execution time, and scalability.

## What I learned

The most useful part of the project has been treating the cube as both a combinatorial search problem and an experiment in algorithm design: every optimization has to be measured against correctness, solution quality, and runtime.
