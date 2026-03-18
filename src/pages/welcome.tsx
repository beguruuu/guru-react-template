import { useEffect, useRef } from "react";
import guruLogo from "@/assets/images/guru-text.png";

const C = {
  darkNavy: "#11162A",
  midBlue: "#242E6F",
  guruBlue: "#3137B1",
  lightBlue: "#5B6BD5",
  paleBlue: "#8B97E8",
  veryPale: "#C8D0F4",
  ice: "#E4E8FB",
  white: "#FFFFFF",
  windowGlow: "#B8C4F8",
  shadow: "rgba(17,22,42,0.12)",
  darkShadow: "rgba(17,22,42,0.25)",
};

// Isometric helpers
const ISO_ANGLE = Math.PI / 6; // 30 degrees
const COS30 = Math.cos(ISO_ANGLE);
const SIN30 = Math.sin(ISO_ANGLE);

function IsometricFactory({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 800;
    const H = 600;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    let t = 0;
    const startTime = performance.now();

    function ease(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
    }

    // ─── ISOMETRIC PRIMITIVES ───

    function isoBox(
      x: number, y: number,
      w: number, h: number, d: number,
      top: string, left: string, right: string,
      stroke = true,
    ) {
      if (!ctx) return;
      const hw = w * COS30;
      const hd = d * COS30;
      const sw = w * SIN30;
      const sd = d * SIN30;

      // Top face
      ctx.fillStyle = top;
      ctx.beginPath();
      ctx.moveTo(x, y - h);
      ctx.lineTo(x + hw, y - h + sw);
      ctx.lineTo(x + hw - hd, y - h + sw + sd);
      ctx.lineTo(x - hd, y - h + sd);
      ctx.closePath();
      ctx.fill();
      if (stroke) { ctx.strokeStyle = C.midBlue; ctx.lineWidth = 0.8; ctx.stroke(); }

      // Left face
      ctx.fillStyle = left;
      ctx.beginPath();
      ctx.moveTo(x, y - h);
      ctx.lineTo(x - hd, y - h + sd);
      ctx.lineTo(x - hd, y + sd);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fill();
      if (stroke) ctx.stroke();

      // Right face
      ctx.fillStyle = right;
      ctx.beginPath();
      ctx.moveTo(x, y - h);
      ctx.lineTo(x + hw, y - h + sw);
      ctx.lineTo(x + hw, y + sw);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fill();
      if (stroke) ctx.stroke();
    }

    // Window on left face (isometric parallelogram)
    function windowLeft(x: number, y: number, ww: number, wh: number) {
      if (!ctx) return;
      const hw = ww * COS30;
      const sw = ww * SIN30;
      // Window glass
      ctx.fillStyle = C.windowGlow;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - hw, y + sw);
      ctx.lineTo(x - hw, y + sw + wh);
      ctx.lineTo(x, y + wh);
      ctx.closePath();
      ctx.fill();
      // Frame
      ctx.strokeStyle = C.midBlue;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // Cross bars
      ctx.beginPath();
      ctx.moveTo(x - hw / 2, y + sw / 2);
      ctx.lineTo(x - hw / 2, y + sw / 2 + wh);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - hw, y + sw + wh / 2);
      ctx.lineTo(x, y + wh / 2);
      ctx.stroke();
      // Glare
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - hw / 3, y + sw / 3);
      ctx.lineTo(x - hw / 3, y + sw / 3 + wh * 0.6);
      ctx.lineTo(x, y + wh * 0.6);
      ctx.closePath();
      ctx.fill();
    }

    // Window on right face
    function windowRight(x: number, y: number, ww: number, wh: number) {
      if (!ctx) return;
      const hw = ww * COS30;
      const sw = ww * SIN30;
      ctx.fillStyle = C.windowGlow;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + hw, y + sw);
      ctx.lineTo(x + hw, y + sw + wh);
      ctx.lineTo(x, y + wh);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = C.midBlue;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + hw / 2, y + sw / 2);
      ctx.lineTo(x + hw / 2, y + sw / 2 + wh);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y + wh / 2);
      ctx.lineTo(x + hw, y + sw + wh / 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + hw / 3, y + sw / 3);
      ctx.lineTo(x + hw / 3, y + sw / 3 + wh * 0.6);
      ctx.lineTo(x, y + wh * 0.6);
      ctx.closePath();
      ctx.fill();
    }

    // ─── GROUND PLATFORM ───
    function drawPlatform() {
      if (!ctx) return;
      const cx = 400, cy = 420;
      const pw = 340, pd = 220;
      const hw = pw * COS30, hd = pd * COS30;
      const sw = pw * SIN30, sd = pd * SIN30;
      const edgeH = 14;

      // Shadow
      ctx.fillStyle = C.shadow;
      ctx.beginPath();
      ctx.moveTo(cx + 8, cy + 8);
      ctx.lineTo(cx + hw + 8, cy + sw + 8);
      ctx.lineTo(cx + hw - hd + 8, cy + sw + sd + 8);
      ctx.lineTo(cx - hd + 8, cy + sd + 8);
      ctx.closePath();
      ctx.fill();

      // Top surface
      ctx.fillStyle = C.ice;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + hw, cy + sw);
      ctx.lineTo(cx + hw - hd, cy + sw + sd);
      ctx.lineTo(cx - hd, cy + sd);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = C.guruBlue;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Front-left edge
      ctx.fillStyle = C.guruBlue;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx - hd, cy + sd);
      ctx.lineTo(cx - hd, cy + sd + edgeH);
      ctx.lineTo(cx, cy + edgeH);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = C.darkNavy;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Front-right edge
      ctx.fillStyle = C.midBlue;
      ctx.beginPath();
      ctx.moveTo(cx - hd, cy + sd);
      ctx.lineTo(cx + hw - hd, cy + sw + sd);
      ctx.lineTo(cx + hw - hd, cy + sw + sd + edgeH);
      ctx.lineTo(cx - hd, cy + sd + edgeH);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // ─── CHIMNEY ───
    function drawChimney(x: number, y: number, h: number, radius: number, smokeT: number) {
      if (!ctx) return;
      // Cylinder body
      const cw = radius * 2;
      isoBox(x, y, cw, h, cw, C.paleBlue, C.midBlue, C.guruBlue, true);

      // Rim
      isoBox(x, y - h, cw + 4, 4, cw + 4, C.lightBlue, C.midBlue, C.guruBlue, true);

      // Smoke puffs
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = C.veryPale;
      for (let i = 0; i < 6; i++) {
        const sx = x - radius + Math.sin(smokeT * 0.8 + i * 1.2) * (6 + i * 2);
        const sy = y - h - 8 - i * 16 - Math.sin(smokeT * 0.4 + i) * 4;
        const r = 4 + i * 4 + Math.sin(smokeT * 0.6 + i * 0.8) * 3;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // ─── MAIN FACTORY BUILDING ───
    function drawMainFactory() {
      const bx = 320, by = 350;
      const bw = 120, bh = 140, bd = 90;

      // Building shadow on ground
      if (ctx) {
        ctx.fillStyle = C.darkShadow;
        ctx.globalAlpha = 0.15;
        const hw = bw * COS30;
        const hd = bd * COS30;
        const sd = bd * SIN30;
        ctx.beginPath();
        ctx.moveTo(bx - hd, by + sd);
        ctx.lineTo(bx - hd - 40, by + sd + 20);
        ctx.lineTo(bx + hw - hd - 40, by + sd + 20 + bw * SIN30);
        ctx.lineTo(bx + hw - hd, by + sd + bw * SIN30);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Main body
      isoBox(bx, by, bw, bh, bd, C.lightBlue, C.midBlue, C.guruBlue);

      // Roof ledge
      isoBox(bx, by - bh, bw + 6, 6, bd + 6, C.paleBlue, C.lightBlue, C.midBlue);

      // Roof equipment boxes
      isoBox(bx + 20, by - bh - 6, 14, 8, 14, C.paleBlue, C.midBlue, C.guruBlue);
      isoBox(bx + 55, by - bh - 6, 10, 6, 10, C.paleBlue, C.midBlue, C.guruBlue);

      // Vent on roof
      if (ctx) {
        const vx = bx + 70, vy = by - bh - 6;
        ctx.fillStyle = C.midBlue;
        ctx.beginPath();
        ctx.ellipse(vx, vy, 8, 5, -0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = C.darkNavy;
        ctx.lineWidth = 1;
        ctx.stroke();
        // Vent lines
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.moveTo(vx + i * 2.5 - 1, vy - 3);
          ctx.lineTo(vx + i * 2.5 + 1, vy + 3);
          ctx.stroke();
        }
      }

      // Windows on LEFT face (3 rows x 3 cols)
      const hw = bw * COS30;
      const hd = bd * COS30;
      const sw = bw * SIN30;
      const sd = bd * SIN30;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const wx = bx - hd + col * (hd / 3.5) + 8;
          const wy = by - bh + 20 + col * (sd / 3.5) + row * 38;
          windowLeft(wx, wy, 16, 28);
        }
      }

      // Windows on RIGHT face (3 rows x 2 cols)
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 2; col++) {
          const wx = bx + 4 + col * (hw / 2.8);
          const wy = by - bh + 20 + col * (sw / 2.8) + row * 38;
          windowRight(wx, wy, 18, 28);
        }
      }

      // Door on left face
      if (ctx) {
        const dx = bx - hd + hd * 0.35;
        const dy = by + sd * 0.35 - 2;
        ctx.fillStyle = C.darkNavy;
        const doorW = 14;
        const doorH = 32;
        ctx.beginPath();
        ctx.moveTo(dx, dy - doorH);
        ctx.lineTo(dx - doorW * COS30, dy - doorH + doorW * SIN30);
        ctx.lineTo(dx - doorW * COS30, dy + doorW * SIN30);
        ctx.lineTo(dx, dy);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = C.midBlue;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // ─── OFFICE BUILDING (LEFT) ───
    function drawOfficeBuilding() {
      const ox = 190, oy = 385;
      const ow = 65, oh = 100, od = 55;

      // Shadow
      if (ctx) {
        ctx.fillStyle = C.darkShadow;
        ctx.globalAlpha = 0.12;
        const hd = od * COS30;
        const sd = od * SIN30;
        ctx.beginPath();
        ctx.moveTo(ox - hd, oy + sd);
        ctx.lineTo(ox - hd - 25, oy + sd + 12);
        ctx.lineTo(ox + ow * COS30 - hd - 25, oy + sd + 12 + ow * SIN30);
        ctx.lineTo(ox + ow * COS30 - hd, oy + sd + ow * SIN30);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      isoBox(ox, oy, ow, oh, od, C.lightBlue, C.midBlue, C.guruBlue);
      isoBox(ox, oy - oh, ow + 4, 5, od + 4, C.paleBlue, C.lightBlue, C.midBlue);

      // Roof equipment
      isoBox(ox + 15, oy - oh - 5, 10, 5, 10, C.paleBlue, C.midBlue, C.guruBlue);

      // Left face windows (4 rows x 2 cols)
      const hd = od * COS30;
      const sd = od * SIN30;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 2; col++) {
          const wx = ox - hd + col * (hd / 2.5) + 6;
          const wy = oy - oh + 14 + col * (sd / 2.5) + row * 22;
          windowLeft(wx, wy, 12, 16);
        }
      }

      // Right face windows (4 rows x 1 col)
      for (let row = 0; row < 4; row++) {
        const wx = ox + 4;
        const wy = oy - oh + 14 + row * 22;
        windowRight(wx, wy, 14, 16);
      }
    }

    // ─── STORAGE RACKS (RIGHT) ───
    function drawStorageRacks() {
      if (!ctx) return;
      const rx = 555, ry = 370;

      for (let rack = 0; rack < 2; rack++) {
        const rox = rx + rack * 45;
        const roy = ry + rack * 25;

        // Rack frame - vertical posts
        const postH = 80;
        const rackW = 35;
        const rackD = 20;

        // 4 vertical posts
        const posts = [
          [rox, roy],
          [rox + rackW * COS30, roy + rackW * SIN30],
          [rox - rackD * COS30, roy + rackD * SIN30],
          [rox + rackW * COS30 - rackD * COS30, roy + rackW * SIN30 + rackD * SIN30],
        ];
        ctx.strokeStyle = C.midBlue;
        ctx.lineWidth = 2.5;
        for (const [px, py] of posts) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, py - postH);
          ctx.stroke();
        }

        // Cross braces on right face
        ctx.strokeStyle = C.lightBlue;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(posts[0][0], posts[0][1]);
        ctx.lineTo(posts[1][0], posts[1][1] - postH);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(posts[1][0], posts[1][1]);
        ctx.lineTo(posts[0][0], posts[0][1] - postH);
        ctx.stroke();

        // 3 shelf levels
        for (let level = 0; level < 3; level++) {
          const ly = level * 25 + 8;
          const shelfY = roy - ly;

          // Shelf surface
          ctx.fillStyle = C.lightBlue;
          ctx.beginPath();
          ctx.moveTo(rox, shelfY);
          ctx.lineTo(rox + rackW * COS30, shelfY + rackW * SIN30);
          ctx.lineTo(rox + rackW * COS30 - rackD * COS30, shelfY + rackW * SIN30 + rackD * SIN30);
          ctx.lineTo(rox - rackD * COS30, shelfY + rackD * SIN30);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = C.midBlue;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Crates on shelf
          if (level < 3) {
            for (let b = 0; b < 2; b++) {
              const bx = rox + b * 16 + 2;
              const bby = shelfY + b * 8 + 4;
              isoBox(bx, bby, 12, 12, 10, C.veryPale, C.lightBlue, C.midBlue, true);
            }
          }
        }
      }
    }

    // ─── CONVEYOR BELT ───
    function drawConveyor(phase: number) {
      if (!ctx) return;
      const x1 = 340, y1 = 390;
      const x2 = 480, y2 = 405;
      const beltH = 18;

      // Legs
      ctx.strokeStyle = C.midBlue;
      ctx.lineWidth = 2;
      const legs = 4;
      for (let i = 0; i < legs; i++) {
        const frac = (i + 0.5) / legs;
        const lx = x1 + (x2 - x1) * frac;
        const ly = y1 + (y2 - y1) * frac;
        ctx.beginPath();
        ctx.moveTo(lx - 3, ly - beltH);
        ctx.lineTo(lx - 6, ly + 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(lx + 3, ly - beltH);
        ctx.lineTo(lx + 6, ly + 10);
        ctx.stroke();
      }

      // Belt surface
      ctx.fillStyle = C.midBlue;
      ctx.beginPath();
      ctx.moveTo(x1, y1 - beltH);
      ctx.lineTo(x2, y2 - beltH);
      ctx.lineTo(x2, y2 - beltH + 5);
      ctx.lineTo(x1, y1 - beltH + 5);
      ctx.closePath();
      ctx.fill();

      // Belt top
      ctx.fillStyle = C.lightBlue;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      ctx.beginPath();
      ctx.moveTo(x1, y1 - beltH);
      ctx.lineTo(x2, y2 - beltH);
      ctx.lineTo(x2 - 8 * Math.sin(angle), y2 - beltH - 4);
      ctx.lineTo(x1 - 8 * Math.sin(angle), y1 - beltH - 4);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = C.midBlue;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Rollers
      ctx.strokeStyle = C.darkNavy;
      ctx.lineWidth = 1;
      const rollerCount = 10;
      for (let i = 0; i <= rollerCount; i++) {
        const frac = (i / rollerCount + (phase * 0.03) % 1) % 1;
        const rx = x1 + (x2 - x1) * frac;
        const ry = y1 + (y2 - y1) * frac - beltH;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 8 * Math.sin(angle), ry - 4);
        ctx.stroke();
      }

      // Moving crates on conveyor
      for (let i = 0; i < 2; i++) {
        const boxFrac = ((phase * 0.04 + i * 0.45) % 1);
        const bx = x1 + (x2 - x1) * boxFrac;
        const by = y1 + (y2 - y1) * boxFrac - beltH - 4;
        isoBox(bx, by, 10, 10, 8, C.veryPale, C.lightBlue, C.midBlue, true);
      }
    }

    // ─── ROBOT ARM ───
    function drawRobotArm(x: number, y: number, phase: number, scale = 1) {
      if (!ctx) return;
      const angle1 = Math.sin(phase * 1.2) * 0.5;
      const angle2 = Math.sin(phase * 1.8 + 1) * 0.4;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      // Base
      ctx.fillStyle = C.darkNavy;
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = C.midBlue;
      ctx.fillRect(-4, -12, 8, 12);

      // Shoulder joint
      ctx.fillStyle = C.guruBlue;
      ctx.beginPath();
      ctx.arc(0, -12, 5, 0, Math.PI * 2);
      ctx.fill();

      // Upper arm
      ctx.save();
      ctx.translate(0, -12);
      ctx.rotate(angle1);
      ctx.fillStyle = C.guruBlue;
      ctx.fillRect(-3, -30, 6, 30);

      // Elbow joint
      ctx.fillStyle = C.midBlue;
      ctx.beginPath();
      ctx.arc(0, -30, 4, 0, Math.PI * 2);
      ctx.fill();

      // Forearm
      ctx.save();
      ctx.translate(0, -30);
      ctx.rotate(angle2);
      ctx.fillStyle = C.lightBlue;
      ctx.fillRect(-2.5, -22, 5, 22);

      // Gripper
      ctx.fillStyle = C.darkNavy;
      ctx.fillRect(-6, -26, 4, 6);
      ctx.fillRect(2, -26, 4, 6);
      // Gripper tips
      ctx.fillRect(-7, -28, 3, 3);
      ctx.fillRect(4, -28, 3, 3);

      ctx.restore();
      ctx.restore();
      ctx.restore();
    }

    // ─── FORKLIFT ───
    function drawForklift(x: number, y: number, phase: number, direction = 1) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      if (direction < 0) ctx.scale(-1, 1);

      const bob = Math.sin(phase * 2) * 1;

      // Fork mast
      ctx.fillStyle = C.darkNavy;
      ctx.fillRect(18, -30 + bob, 3, 30);
      // Forks
      ctx.fillRect(16, -2 + bob, 14, 2);
      ctx.fillRect(16, -8 + bob, 14, 2);

      // Crate on fork
      isoBox(24, -10 + bob, 10, 10, 8, C.veryPale, C.lightBlue, C.midBlue, true);

      // Body
      ctx.fillStyle = C.guruBlue;
      ctx.beginPath();
      ctx.roundRect(-14, -22 + bob, 30, 16, 3);
      ctx.fill();
      ctx.strokeStyle = C.darkNavy;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Cab roof
      ctx.fillStyle = C.midBlue;
      ctx.fillRect(-12, -30 + bob, 18, 10);
      ctx.strokeStyle = C.darkNavy;
      ctx.stroke();

      // Cab window
      ctx.fillStyle = C.windowGlow;
      ctx.fillRect(-8, -28 + bob, 12, 6);

      // Counterweight
      ctx.fillStyle = C.darkNavy;
      ctx.fillRect(-16, -18 + bob, 4, 12);

      // Wheels
      ctx.fillStyle = C.darkNavy;
      ctx.beginPath();
      ctx.ellipse(-8, 0 + bob, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(10, 0 + bob, 5, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      // Wheel rims
      ctx.fillStyle = C.midBlue;
      ctx.beginPath();
      ctx.ellipse(-8, 0 + bob, 3, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(10, 0 + bob, 2.5, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // ─── TRUCK ───
    function drawTruck(x: number, y: number) {
      if (!ctx) return;
      // Shadow
      ctx.fillStyle = C.darkShadow;
      ctx.globalAlpha = 0.12;
      ctx.beginPath();
      ctx.ellipse(x + 10, y + 18, 55, 16, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Container
      isoBox(x, y, 70, 42, 32, C.lightBlue, C.midBlue, C.darkNavy);

      // Container lines (ribs)
      ctx.strokeStyle = C.guruBlue;
      ctx.lineWidth = 0.6;
      const hw = 70 * COS30;
      const sw = 70 * SIN30;
      for (let i = 1; i < 5; i++) {
        const frac = i / 5;
        const lx = x + hw * frac;
        const ly = y - 42 + sw * frac;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(lx, ly + 42);
        ctx.stroke();
      }

      // Cab
      isoBox(x + hw - 2, y + sw - 2, 28, 35, 32, C.guruBlue, C.midBlue, C.darkNavy);

      // Windshield
      ctx.fillStyle = C.windowGlow;
      const cabX = x + hw + 28 * COS30 - 4;
      const cabY = y + sw + 28 * SIN30 - 35 + 8;
      ctx.beginPath();
      ctx.moveTo(cabX, cabY);
      ctx.lineTo(cabX + 12, cabY + 6);
      ctx.lineTo(cabX + 12, cabY + 20);
      ctx.lineTo(cabX, cabY + 14);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = C.midBlue;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Bumper
      ctx.fillStyle = C.darkNavy;
      const bumperX = x + hw + 28 * COS30;
      const bumperY = y + sw + 28 * SIN30 - 2;
      ctx.fillRect(bumperX - 2, bumperY, 16, 4);

      // Wheels
      ctx.fillStyle = C.darkNavy;
      const wheelY = y + 16;
      for (const wfrac of [0.15, 0.35, 0.75]) {
        const wx = x + hw * wfrac + 2;
        const wy = wheelY + sw * wfrac;
        ctx.beginPath();
        ctx.ellipse(wx, wy, 7, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = C.midBlue;
        ctx.beginPath();
        ctx.ellipse(wx, wy, 4, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = C.darkNavy;
      }
    }

    // ─── WORKER ───
    function drawWorker(x: number, y: number, phase: number, armUp = false) {
      if (!ctx) return;
      const walk = Math.sin(phase * 3) * 2;

      // Shadow
      ctx.fillStyle = C.shadow;
      ctx.beginPath();
      ctx.ellipse(x, y + 2, 6, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Legs
      ctx.strokeStyle = C.darkNavy;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x - 2, y - 8);
      ctx.lineTo(x - 3 - walk * 0.5, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 2, y - 8);
      ctx.lineTo(x + 3 + walk * 0.5, y);
      ctx.stroke();

      // Body
      ctx.fillStyle = C.guruBlue;
      ctx.beginPath();
      ctx.roundRect(x - 5, y - 18, 10, 12, 2);
      ctx.fill();

      // Arms
      ctx.strokeStyle = C.midBlue;
      ctx.lineWidth = 2;
      if (armUp) {
        ctx.beginPath();
        ctx.moveTo(x - 5, y - 15);
        ctx.lineTo(x - 10, y - 22 + Math.sin(phase * 4) * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(x - 5, y - 15);
        ctx.lineTo(x - 8, y - 8);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(x + 5, y - 15);
      ctx.lineTo(x + 8, y - 8);
      ctx.stroke();

      // Head
      ctx.fillStyle = C.veryPale;
      ctx.beginPath();
      ctx.arc(x, y - 22, 4, 0, Math.PI * 2);
      ctx.fill();

      // Hard hat
      ctx.fillStyle = C.guruBlue;
      ctx.beginPath();
      ctx.ellipse(x, y - 25, 5, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(x - 4, y - 27, 8, 3);
    }

    // ─── AGV ROBOT ───
    function drawAGV(x: number, y: number, phase: number) {
      if (!ctx) return;
      // Shadow
      ctx.fillStyle = C.shadow;
      ctx.beginPath();
      ctx.ellipse(x, y + 4, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Base
      isoBox(x, y, 18, 8, 14, C.midBlue, C.darkNavy, "#1d2555", true);

      // Antenna
      ctx.strokeStyle = C.darkNavy;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y - 8);
      ctx.lineTo(x, y - 20);
      ctx.stroke();

      // Antenna light (blinking)
      ctx.fillStyle = Math.sin(phase * 4) > 0 ? C.lightBlue : C.guruBlue;
      ctx.beginPath();
      ctx.arc(x, y - 20, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Wheels
      ctx.fillStyle = C.darkNavy;
      ctx.beginPath();
      ctx.ellipse(x - 6, y + 2, 3, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x + 6, y + 2, 3, 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // ─── SCATTERED CRATES ───
    function drawScatteredCrates() {
      const crates = [
        { x: 250, y: 428, s: 12 },
        { x: 268, y: 434, s: 10 },
        { x: 258, y: 420, s: 11 },
        { x: 275, y: 442, s: 9 },
      ];
      for (const c of crates) {
        isoBox(c.x, c.y, c.s, c.s, c.s * 0.8, C.veryPale, C.lightBlue, C.midBlue, true);
      }
    }

    // ─── MAIN DRAW LOOP ───
    function draw() {
      if (!ctx || !canvas) return;
      const elapsed = performance.now() - startTime;
      const intro = Math.min(elapsed / 2000, 1);
      const e = ease(intro);
      t += 0.016;

      ctx.clearRect(0, 0, W, H);

      ctx.save();
      ctx.globalAlpha = e;

      // Center and scale the scene to fit the canvas
      // Scene bounds: approx x[140..720], y[60..500] → center ~(430, 280), span ~(580, 440)
      const scaleF = 1.18;
      const offsetX = (W - 580 * scaleF) / 2 - 140 * scaleF + 40;
      const offsetY = (H - 440 * scaleF) / 2 - 60 * scaleF + 10;
      ctx.translate(offsetX, offsetY);
      ctx.scale(scaleF, scaleF);

      // 1. Ground platform
      drawPlatform();

      // 2. Back elements (racks)
      drawStorageRacks();

      // 3. Main factory
      drawMainFactory();

      // 4. Chimneys
      drawChimney(290, 210, 65, 8, t);
      drawChimney(330, 210, 80, 7, t + 1.5);

      // 5. Office building (left)
      drawOfficeBuilding();

      // 6. Conveyor belt
      drawConveyor(t);

      // 7. Robot arms
      drawRobotArm(360, 400, t, 0.9);
      drawRobotArm(455, 400, t + 2, 0.75);

      // 8. Workers
      drawWorker(305, 435, t);
      drawWorker(415, 420, t + 1, true);
      drawWorker(220, 445, t + 2.5);

      // 9. AGV robot
      drawAGV(380, 440, t);

      // 10. Forklifts
      drawForklift(260, 455, t);
      drawForklift(340, 460, t + 1.5, -1);

      // 11. Scattered crates
      drawScatteredCrates();

      // 12. Truck
      drawTruck(510, 420);

      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}

export function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 lg:px-16 overflow-hidden">
      <div className="flex w-full max-w-[1440px] flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
        {/* Left side - Logo & tagline */}
        <div className="flex flex-col gap-6 lg:gap-8 max-w-[560px] animate-in fade-in slide-in-from-left-8 duration-700">
          <img
            src={guruLogo}
            alt="GURU"
            className="h-36 sm:h-44 lg:h-52 w-auto"
            draggable={false}
          />

          <div className="flex flex-col gap-1">
            <p
              className="text-lg sm:text-xl lg:text-[1.6rem] font-bold tracking-wide leading-snug"
              style={{
                background: `linear-gradient(135deg, ${C.darkNavy} 0%, ${C.midBlue} 50%, ${C.guruBlue} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Build & Customize your Operating System
            </p>
            <p
              className="text-base sm:text-lg lg:text-xl italic font-light"
              style={{ color: C.midBlue }}
            >
              step by step — just by chatting
            </p>
          </div>
        </div>

        {/* Right side - Isometric factory canvas */}
        <div className="flex-shrink-0 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
          <IsometricFactory className="w-[360px] sm:w-[500px] lg:w-[640px] xl:w-[750px]" />
        </div>
      </div>
    </div>
  );
}
