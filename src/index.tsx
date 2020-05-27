import * as React from 'react'
import styles from './styles.module.css'

export interface Props {
  width: number;
  height: number;
  foregroundColor: string;
  backgroundColor: string;
  strokeWidth: number;
  percentage: number;
  renderText?: (percentage: number) => HTMLElement;
}

const DEFAULT_SIZE = 170;
const DEFAULT_FOREGROUND_COLOR = "rgb(64, 159, 255)";
const DEFAULT_BACKGROUND_COLOR = "rgb(232, 235, 237)";

export const CircularDeterminateProgress = ({ 
  width, height, percentage, foregroundColor, backgroundColor, strokeWidth, renderText
}: Props) => {
  return (
    <div className={styles.spinner}>
      <svg
          className={
            percentage > 0 && percentage < 1 
            ? `${styles.spinnerCircle} ${styles.rotating}`
            : styles.spinnerCircle} 
          height={sizeOrDefault(height)}
          width={sizeOrDefault(width)} 
          shapeRendering="geometricPrecision" 
          viewBox={viewBox(width, height)}>
            <BackgroundCircle 
              strokeColor={backgroundColor || DEFAULT_BACKGROUND_COLOR}
              strokeWidth={strokeWidth} />
            <Circle 
              strokeColor={foregroundColor || DEFAULT_FOREGROUND_COLOR} 
              strokeWidth={strokeWidth}
              percentage={percentage} />
      </svg>
      { !!renderText && renderText(percentage) }
    </div>
  );
}

function sizeOrDefault(v: number): number {
  return v || DEFAULT_SIZE;
}

function viewBox(width: number, height: number): string {
  return `0 0 ${sizeOrDefault(width)} ${sizeOrDefault(height)}`;
}

interface CircleProps {
  strokeWidth?: number;
  strokeColor?: string;
  percentage: number;
}

const Circle = ({strokeWidth, strokeColor, percentage}: CircleProps) => {
  return (
    <circle r="80" cx="85" cy="85" fill="transparent" strokeLinecap="round"
      style={style(percentage, strokeWidth, strokeColor)}>
    </circle>
  )
}

interface BackgrounCircleProps {
  strokeWidth?: number;
  strokeColor?: string;
}

const BackgroundCircle = ({strokeColor, strokeWidth}: BackgrounCircleProps) => {
  return (
    <Circle 
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
      percentage={1} />
  )
}

const STROKE_DASHARRAY = 502.655
const DEFAULT_STROKE_SIZE = 10;
const DEFAULT_STROKE_COLOR = "rgb(232, 235, 237)";

function style(percentage: number, strokeWidth?: number, strokeColor?: string): any {
  return {
    strokeDasharray: STROKE_DASHARRAY,
    strokeDashoffset: STROKE_DASHARRAY * (1.0 - validatedPercentage(percentage)),
    strokeWidth: strokeWidth || DEFAULT_STROKE_SIZE,
    stroke: strokeColor || DEFAULT_STROKE_COLOR,
  };
}

function validatedPercentage(p: number): number {
  if (p < 0) {
    return 0;
  }

  if (p > 1.0) {
    return 1;
  }

  return p;
}