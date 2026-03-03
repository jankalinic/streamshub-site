+++
title = 'Quick Start'
date = 2025-01-09T16:14:02Z
[cascade]
  type = 'quickstart'

weight = 2
+++
# Streamshub Console – Quickstart Guide
This quickstart walks you through deploying Streamshub Console, a web UI for interacting with Apache Kafka clusters, on Kubernetes. It uses Strimzi to manage Kafka and demonstrates how to expose and connect the Console to your cluster.

The Console works on Minikube, OpenShift, and other Kubernetes distributions.
## Prerequisites
Before you begin, ensure you have the following installed:
* Kubernetes cluster
* kubectl cli

Both `kubectl` and minikube can be found here 👉 https://kubernetes.io/docs/tasks/tools/

`Note: While this guide highlights Minikube-specific steps, Streamshub Console works equally well on OpenShift.`

## 1. Install Strimzi (Kafka Operator)
Streamshub Console relies on Strimzi to manage Kafka clusters and users.

You can install Strimzi using one of the following methods:
* Helm
* Operator Lifecycle Manager (OLM) (recommended for OpenShift)
* YAML bundle applied directly with kubectl

Refer to the official Strimzi documentation for installation instructions:
👉 https://strimzi.io/documentation/

Once installed, Strimzi enables you to define Kafka-related Custom Resources such as:
* Kafka
* KafkaUser
* KafkaTopic

## 2. Install Streamshub Console Operator
The Streamshub Console Operator can be installed using:
* OLM (recommended on OpenShift)
* YAML bundle applied directly to the cluster

You can get the latest released Console from:
👉 https://github.com/streamshub/console/releases

After installation, the operator introduces the Console Custom Resource Definition (CRD).

### Minikube-specific Configuration

If you are running Console on Minikube and exposing Kafka using TLS passthrough, you must enable SSL passthrough on the NGINX ingress controller:
``` shell
kubectl patch deployment -n ingress-nginx ingress-nginx-controller \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value":"--enable-ssl-passthrough"}]'
```

This step is not required on OpenShift, where Routes natively support TLS passthrough.

## 3. Deploy a Kafka Cluster

Once Strimzi is installed, you can define a Kafka cluster using provided examples.

Set the required environment variables:
``` shell
export CLUSTER_DOMAIN=apps-crc.testing
export NAMESPACE=kafka
export LISTENER_TYPE=route
```

Then apply the Kafka manifests:
``` shell
cat examples/kafka/*.yaml | envsubst | kubectl apply -n ${NAMESPACE} -f -
```

This will create:
* A Kafka cluster
* Required listeners
* Supporting Kafka resources
* Define Kafka and Console Custom Resources

Once both the Strimzi Operator and Streamshub Console Operator are installed, you can define:
* Kafka clusters (Kafka)
* Kafka users (KafkaUser)
* Streamshub Console instances (Console)
* Example Console Custom Resource

Below is a minimal Console CR that connects Streamshub Console to a Kafka cluster managed by Strimzi:
``` shell
apiVersion: console.streamshub.github.com/v1alpha1
kind: Console
metadata:
  name: example
spec:
  hostname: example-console.example.com # Hostname where the console will be accessed
  kafkaClusters:
    - name: console-kafka               # Name of the Kafka CR
      namespace: kafka                  # Namespace of the Kafka CR
      listener: secure                  # Listener defined on the Kafka CR
      credentials:
        kafkaUser:
          name: console-kafka-user1     # KafkaUser used by the console
```

This configuration tells the Console:
* Which Kafka cluster to connect to
* Which listener to use
* Which Kafka credentials to authenticate with
* Once the resource is applied, the operator will:
* Deploy the Console backend and UI
* Configure networking and access
* Automatically connect the Console to Kafka
* Access the Console

After the Console resource becomes ready, access it via the configured hostname:
```
https://example-console.example.com
```

You should now be able to explore your Kafka cluster using Streamshub Console — browse topics,
 inspect consumer groups, and view messages and metadata. Happy exploring! 🚀