+++
title = "Getting Started"
date = 2026-01-20
description = "An introduction to StreamsHub Console and how you can explore Kafka clusters with confidence."
tags = ["streamshub", "kafka", "ui", "strimzi"]
draft = false
[cascade]
  type = 'guide'


weight = 1
+++

# Getting started

## What is StreamsHub Console?

**StreamsHub Console** is a web-based UI for exploring and understanding Apache Kafka clusters.  
It is designed for **developers and operators** who want visibility into Kafka without relying solely on CLI tools or custom scripts.

StreamsHub Console is **GA** and built to work naturally with **Kubernetes and Strimzi**, making it a good fit for modern, cloud-native Kafka deployments.


## What problems does it solve?

Kafka is powerful, but observing what’s happening inside a cluster can be difficult:

- Which topics exist, and how are they configured?
- What messages are flowing through a topic right now?
- Which consumer groups are active, and are they keeping up?

StreamsHub Console answers these questions through a **read-focused, safe UI** that lets you inspect Kafka state without modifying it.


## Key features at a glance

StreamsHub Console focuses on the most common Kafka workflows:

### Topic exploration
- Browse topics in a cluster
- View partitions, replication, and configuration
- Understand topic layout at a glance

### Message inspection
- Read messages directly from a topic
- Inspect keys, values, headers, and offsets
- Useful for debugging producers and data formats

### Consumer groups
- View consumer groups and their members
- Inspect offsets and lag
- Quickly identify stalled or slow consumers

All of this is exposed through a single UI, backed by a Kubernetes-native control plane.



## How StreamsHub is structured

StreamsHub consists of two main parts:

- **StreamsHub Operator**  
  Runs in Kubernetes and connects to Kafka clusters (typically managed by Strimzi).

- **StreamsHub Console (UI)**  
  A web interface that talks to the operator’s API and renders Kafka data in a human-friendly way.

This separation keeps the UI lightweight while allowing the operator to integrate cleanly with Kubernetes APIs and security models.



## How do you get StreamsHub Console?

StreamsHub Console is distributed as container images and Kubernetes resources.

You can always find the **latest releases** here:

- GitHub repository:  
  https://github.com/streamshub/console

From there, you’ll find:
- Release notes
- Container image references
- Installation resources

In the next post, we’ll walk through a **local setup using Minikube**, install **Strimzi with Helm**, and deploy StreamsHub Console step by step.



## What’s next?

**Next up:** *Installing StreamsHub Console locally with Minikube and Strimzi*  
We’ll cover:
- Starting a local Kubernetes cluster
- Installing Strimzi with Helm
- Deploying the StreamsHub Operator and Console
- Accessing the UI in your browser

If you’re eager to dive in, head over to the repo and explore the releases — otherwise, keep reading and follow along in the next post.
