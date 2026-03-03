document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the SVG element where to draw our network
    const svg = document.getElementById("networkSvg");

    // Configuration constants
    const NODE_COUNT = 60;
    // Maximum distance (in pixels) where nodes will connect with lines
    const MAX_DIST = 140;
    //Array to store all node objects - position, velocity
    const nodes = [];
    const links = [];

    // Updates the SVG view-box to match its actual rendered size
    // This ensures the coordinate system matches the visible area
    function sizeSVG() {
        svg.setAttribute("viewBox", `0 0 ${svg.clientWidth} ${svg.clientHeight}`);
    }

    // Resize the SVG whenever the window size changes
    window.addEventListener("resize", sizeSVG);
    // Set initial size
    sizeSVG();

    // Function to create a single node with random position and velocity
    function createNode() {
        const node = {
            // Random starting position anywhere in the SVG
            x: Math.random() * svg.clientWidth,
            y: Math.random() * svg.clientHeight,

            // (Math.random() - 0.5) gives range of -0.5 to +0.5, so +- 0.15
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,

            // Create the SVG circle element for this node
            el: document.createElementNS("http://www.w3.org/2000/svg", "circle")
        };

        // Set circle radius and color
        node.el.setAttribute("r", 2);
        node.el.setAttribute("fill", "#05a6a6");

        // Add the circle to the SVG, so it's visible
        svg.appendChild(node.el);

        return node;
    }

    // Function to create a line connection between nodes
    function createLink() {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("stroke", "#05a6a6");
        line.setAttribute("stroke-width", "1");

        // Start invisible and make it visible when nodes are close enough
        line.setAttribute("opacity", "0");

        svg.appendChild(line);
        return line;
    }

    // Create all nodes
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push(createNode());
    }

    // Create line elements (NODE_COUNT * 2 is a guess at max connections)
    for (let i = 0; i < NODE_COUNT * 2; i++) {
        links.push(createLink());
    }

    // Main animation loop runs at 60 fps
    function animate() {
        // Track current line
        let linkIndex = 0;

        // Update all node positions
        nodes.forEach(n => {
            // Move node by its velocity
            n.x += n.vx;
            n.y += n.vy;

            // Bounce off edges- if node hits left or right/top or bottom wall, reverse velocity
            if (n.x < 0 || n.x > svg.clientWidth) n.vx *= -1;
            if (n.y < 0 || n.y > svg.clientHeight) n.vy *= -1;

            // Update the visual position of the circle element
            n.el.setAttribute("cx", n.x);
            n.el.setAttribute("cy", n.y);
        });

        // Check distances between nodes to draw connections
        nodes.forEach((a, i) => {
            // Only check nodes after current one to avoid duplicate pairs
            // (for example: check A->B but not B->A since they're the same)
            nodes.slice(i + 1).forEach(b => {
                // Calculate distance between nodes using Pythagorean theorem
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                // Actual distance is square root of x^2+y^2
                const dist = Math.sqrt(dx * dx + dy * dy);

                // If nodes are close enough AND there are unused lines
                if (dist < MAX_DIST && linkIndex < links.length) {
                    const l = links[linkIndex++];

                    // Position the line between the two nodes
                    l.setAttribute("x1", a.x);
                    l.setAttribute("y1", a.y);
                    l.setAttribute("x2", b.x);
                    l.setAttribute("y2", b.y);

                    // Fade opacity based on distance: closer = more opacity
                    // At dist=0: opacity=1, at MAX_DIST: opacity=0
                    l.setAttribute("opacity", 1 - dist / MAX_DIST);
                }
            });
        });

        // Hide any unused line elements
        for (; linkIndex < links.length; linkIndex++) {
            links[linkIndex].setAttribute("opacity", "0");
        }

        // Schedule next frame - creates smooth animation loop
        //https://developer.mozilla.org/docs/Web/API/DedicatedWorkerGlobalScope/requestAnimationFrame
        requestAnimationFrame(animate);
    }

// Start the animation
    animate();
});