import type { ActiveRange, TableOfContentsItem } from './use-table-of-contents';

interface Point {
  x: number;
  y: number;
}

type Curve = [Point, Point, Point, Point];

const MAX_RAIL_DEPTH = 2;
const RAIL_BASE_X = 4.5;
const RAIL_DEPTH_INDENT = 8;
const RAIL_CURVE_HANDLE = 4;
const RAIL_CURVE_SAMPLE_COUNT = 24;
const RAIL_WIDTH = RAIL_BASE_X * 2 + MAX_RAIL_DEPTH * RAIL_DEPTH_INDENT;
const TEXT_BASE_INDENT = 18;
const TEXT_DEPTH_INDENT = 12;
const ROW_HEIGHT = 32;
const ROW_PADDING = 6;
const ROW_LINE_LENGTH = ROW_HEIGHT - ROW_PADDING * 2;
const ROW_GAP = ROW_PADDING * 2;

function getRailX(depth: number) {
  return RAIL_BASE_X + Math.min(depth, MAX_RAIL_DEPTH) * RAIL_DEPTH_INDENT;
}

function getRailTop(index: number) {
  return index * ROW_HEIGHT + ROW_PADDING;
}

function getRailBottom(index: number) {
  return (index + 1) * ROW_HEIGHT - ROW_PADDING;
}

function getTextIndent(depth: number) {
  return TEXT_BASE_INDENT + Math.min(depth, MAX_RAIL_DEPTH) * TEXT_DEPTH_INDENT;
}

function getCurve(fromX: number, toX: number, startY: number): Curve {
  return [
    { x: fromX, y: startY },
    { x: fromX, y: startY + ROW_GAP - RAIL_CURVE_HANDLE },
    { x: toX, y: startY + RAIL_CURVE_HANDLE },
    { x: toX, y: startY + ROW_GAP },
  ];
}

function getCurvePoint([start, startHandle, endHandle, end]: Curve, t: number): Point {
  const u = 1 - t;
  const weightList = [u ** 3, 3 * u ** 2 * t, 3 * u * t ** 2, t ** 3];
  const pointList = [start, startHandle, endHandle, end];

  return {
    x: pointList.reduce((sum, { x }, index) => sum + x * weightList[index], 0),
    y: pointList.reduce((sum, { y }, index) => sum + y * weightList[index], 0),
  };
}

function getCurveLength(curve: Curve) {
  let length = 0;
  let previous = curve[0];

  for (let step = 1; step <= RAIL_CURVE_SAMPLE_COUNT; step++) {
    const point = getCurvePoint(curve, step / RAIL_CURVE_SAMPLE_COUNT);

    length += Math.hypot(point.x - previous.x, point.y - previous.y);
    previous = point;
  }

  return length;
}

function getRail(itemList: TableOfContentsItem[]) {
  const offsetList: number[] = [];
  let path = '';
  let length = 0;

  for (const [index, { depth }] of itemList.entries()) {
    const x = getRailX(depth);
    const top = getRailTop(index);

    if (index === 0) {
      path += `M${x} ${top}`;
    } else {
      const curve = getCurve(getRailX(itemList[index - 1].depth), x, top - ROW_GAP);
      const [, startHandle, endHandle, end] = curve;

      path += `C${startHandle.x} ${startHandle.y} ${endHandle.x} ${endHandle.y} ${end.x} ${end.y}`;
      length += getCurveLength(curve);
    }

    path += `L${x} ${getRailBottom(index)}`;
    offsetList.push(length);
    length += ROW_LINE_LENGTH;
  }

  return {
    height: itemList.length * ROW_HEIGHT,
    offsetList,
    path,
    width: RAIL_WIDTH,
  };
}

function getDotDistance(activeRange: ActiveRange | null, offsetList: number[]) {
  if (activeRange === null) {
    return 0;
  }

  if (activeRange.isMovingUp) {
    return offsetList[activeRange.first];
  }

  return offsetList[activeRange.last] + ROW_LINE_LENGTH;
}

export { getDotDistance, getRail, getRailBottom, getRailTop, getTextIndent, ROW_HEIGHT };
