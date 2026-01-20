+++
layout = "landing"
+++

<div class="book-hero justify-center">
    <div class="hero-container">
        <svg class="network-bg" id="networkSvg"></svg>
        <div class="overlay"></div>
        <div class="hero-content">
            <div class="landing-logo justify-center">
                <img src="/favicon.svg" alt="Logo">
                <h1>StreamsHub</h1>
            </div>
            <div class="justify-center">
                <h2 class="text-center">Web-based console for exploring Apache Kafka clusters on Kubernetes.</h2>
            </div>
        </div>
    </div>
</div>

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

<script>
const svg = document.getElementById("networkSvg");
const NODE_COUNT = 60;
const MAX_DIST = 140;
const nodes = [];
const links = [];

function sizeSVG() {
  svg.setAttribute("viewBox", `0 0 ${svg.clientWidth} ${svg.clientHeight}`);
}
window.addEventListener("resize", sizeSVG);
sizeSVG();

function createNode() {
  const node = {
    x: Math.random() * svg.clientWidth,
    y: Math.random() * svg.clientHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    el: document.createElementNS("http://www.w3.org/2000/svg", "circle")
  };

  node.el.setAttribute("r", 2);
  node.el.setAttribute("fill", "#05a6a6");
  svg.appendChild(node.el);

  return node;
}

function createLink() {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("stroke", "#05a6a6");
  line.setAttribute("stroke-width", "1");
  line.setAttribute("opacity", "0");
  svg.appendChild(line);
  return line;
}

for (let i = 0; i < NODE_COUNT; i++) {
  nodes.push(createNode());
}

for (let i = 0; i < NODE_COUNT * 2; i++) {
  links.push(createLink());
}

function animate() {
  let linkIndex = 0;

  nodes.forEach(n => {
    n.x += n.vx;
    n.y += n.vy;

    if (n.x < 0 || n.x > svg.clientWidth) n.vx *= -1;
    if (n.y < 0 || n.y > svg.clientHeight) n.vy *= -1;

    n.el.setAttribute("cx", n.x);
    n.el.setAttribute("cy", n.y);
  });

  nodes.forEach((a, i) => {
    nodes.slice(i + 1).forEach(b => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DIST && linkIndex < links.length) {
        const l = links[linkIndex++];
        l.setAttribute("x1", a.x);
        l.setAttribute("y1", a.y);
        l.setAttribute("x2", b.x);
        l.setAttribute("y2", b.y);
        l.setAttribute("opacity", 1 - dist / MAX_DIST);
      }
    });
  });

  for (; linkIndex < links.length; linkIndex++) {
    links[linkIndex].setAttribute("opacity", "0");
  }

  requestAnimationFrame(animate);
}

animate();
</script>
