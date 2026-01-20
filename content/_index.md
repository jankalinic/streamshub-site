+++
linkTitle = "Home"
layout = "landing"
+++

<div class="landing-logo">
    <img src="/favicon.svg" alt="Logo">
    <h1>StreamsHub</h1>
</div>

A web-based console for exploring and understanding Apache Kafka clusters running on Kubernetes.

{{< badge style="default" title="License" value="Apache-2.0" >}}

<br/>
<br/>

{{<button href="/getting-started">}}Get Started{{</button>}}

Streamshub Console is an open source, web-based UI designed to help developers and operators safely explore and understand Kafka clusters.
Instead of stitching together CLI commands or custom scripts, the console presents Kafka state in a clear and structured way, including:
* Topics, partitions, and replication details
* Messages with keys, values, headers, and offsets
* Consumer groups, active members, and lag information

Streamshub Console integrates naturally with Kubernetes and Strimzi, allowing it to be deployed next to existing Kafka clusters. 
The console is read-focused by design, making it suitable for debugging and day-to-day cluster visibility without changing cluster state.
<br/>

{{% columns %}}

- {{< card title="Card" image="" >}}
  # [Documentation](/docs/main/)

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
