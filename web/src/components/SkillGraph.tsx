import React, { useRef, useEffect } from 'react';

const SKILLS = [
  { id: 'React', group: 1 },
  { id: 'TypeScript', group: 1 },
  { id: 'Node.js', group: 2 },
  { id: 'Python', group: 2 },
  { id: 'Rust', group: 3 },
  { id: 'Docker', group: 3 },
  { id: 'AWS', group: 3 },
  { id: 'Linux', group: 4 },
  { id: 'Git', group: 4 },
  { id: 'Security', group: 5 },
  { id: 'AI/ML', group: 5 },
];

const HACKER_COLORS = ['#00ff41', '#008F11', '#003300', '#ccffda', '#ffffff'];
const SERIOUS_COLORS = ['#2c3e50', '#34495e', '#7f8c8d', '#95a5a6', '#004d00'];

interface SkillGraphProps {
  theme?: 'hacker' | 'serious';
}

const SkillGraph: React.FC<SkillGraphProps> = ({ theme = 'hacker' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isSerious = theme === 'serious';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const colors = isSerious ? SERIOUS_COLORS : HACKER_COLORS;
    const textColor = isSerious ? '#000000' : '#00ff41';
    const lineBaseColor = isSerious ? '50, 50, 50' : '0, 255, 65';

    // Resize Handling
    const handleResize = () => {
      width = canvas.parentElement?.offsetWidth || 300;
      height = 300; // Fixed height
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Nodes initialization
    const nodes = SKILLS.map(skill => ({
      ...skill,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 2
    }));

    // Mouse Interaction
    let mouse = { x: 0, y: 0, active: false };
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    canvas.addEventListener('mouseleave', () => { mouse.active = false; });

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update & Draw Nodes
      nodes.forEach((node, i) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse Repulsion
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            node.vx -= dx * 0.0005;
            node.vy -= dy * 0.0005;
          }
        }

        // Draw Connections
        nodes.forEach((otherNode, j) => {
          if (i === j) return;
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${1 - dist / 150})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });

        // Draw Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[node.group % colors.length];
        ctx.fill();

        // Draw Label
        ctx.fillStyle = textColor;
        ctx.font = 'bold 14px JetBrains Mono';
        ctx.fillText(node.id, node.x + 12, node.y + 5);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSerious]);

  return (
    <div className="border border-success mt-3 p-1" style={{ height: '200px', backgroundColor: isSerious ? 'transparent' : '#050505' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

export default SkillGraph;