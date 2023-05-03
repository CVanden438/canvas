import React, { useRef, useEffect, useState } from 'react';
import styles from './Canvas.module.css';
const PIXEL_SIZE = 50;
const GRID_SIZE = 10;
const grid: unknown[] = [];
let canvas;
let ctx;
for (let i = 0; i < GRID_SIZE; i++) {
  //   grid.push(new Array(GRID_SIZE).fill(0));
  grid.push(Array.from({ length: GRID_SIZE }).fill(0));
}
const Canvas = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    canvas = canvasRef.current;
    //@ts-ignore
    ctx = canvas.getContext('2d');
    drawGrid();
  }, []);

  const drawGrid = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        ctx.strokeRect(j * PIXEL_SIZE, i * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  };
  const draw = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / PIXEL_SIZE);
    const y = Math.floor((event.clientY - rect.top) / PIXEL_SIZE);
    // update grid
    grid[y][x] = 1;
    // draw pixel
    ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
  };

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    draw(e);
  };

  const handleMouseUp = (e) => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (isMouseDown) {
      draw(e);
    }
  };

  const toggleGrid = () => {
    setIsGrid(!isGrid);
    clearGrid();
  };

  const clearGrid = () => {
    // clear grid
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        grid[i][j] = 0;
      }
    }
    // redraw grid
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isGrid && drawGrid();
  };
  return (
    <>
      <canvas
        height={500}
        width={500}
        className={styles.canvas}
        ref={canvasRef}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={(e) => handleMouseUp(e)}
        onMouseMove={(e) => handleMouseMove(e)}
      />
      <button onClick={clearGrid}>Clear</button>
      <button onClick={toggleGrid}>Pixel Art</button>
    </>
  );
};

export default Canvas;
