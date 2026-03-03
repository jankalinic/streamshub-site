+++
layout = "landing"
title = "StreamsHub"
subtitle = "Web-based console for exploring Apache Kafka clusters on Kubernetes."
+++

{{< logo-background >}}

{{% columns %}}

- {{< card title="Card" image="" >}}
  # [Documentation](/docs/)

  Core documentation covering StreamsHub Console concepts, architecture, and usage.

  Learn how the console works and how to navigate Kafka clusters with confidence.
  {{< /card >}}

- {{< card title="Card" image="" >}}
  # [Getting Started](/getting-started)

  Install StreamsHub Console locally or in Kubernetes and connect to your first Kafka cluster.

  Step-by-step guides using Minikube, Strimzi, and Helm.
  {{< /card >}}

- {{< card title="Card" image="" >}}
  # [Quick start](/quick-start)

  Practical examples demonstrating common Kafka workflows in StreamsHub Console.

  Explore topics, inspect messages, and understand consumer groups in action.
  {{< /card >}}

{{% /columns %}}

<br/>

Streamshub Console is an open source, web-based UI designed to help developers and operators safely explore and understand Kafka clusters.
Instead of stitching together CLI commands or custom scripts, the console presents Kafka state in a clear and structured way, including:
* Topics, partitions, and replication details
* Messages with keys, values, headers, and offsets
* Consumer groups, active members, and lag information

Streamshub Console integrates naturally with Kubernetes and Strimzi, allowing it to be deployed next to existing Kafka clusters. 
The console is read-focused by design, making it suitable for debugging and day-to-day cluster visibility without changing cluster state.
<br/>


