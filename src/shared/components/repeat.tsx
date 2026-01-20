import React, { createElement, Fragment, type ReactNode } from 'react';

import { range } from 'es-toolkit';

// void element를 제외한 HTML 요소 타입
type NonVoidElement = Exclude<
  keyof React.JSX.IntrinsicElements,
  | 'area'
  | 'base'
  | 'br'
  | 'col'
  | 'embed'
  | 'hr'
  | 'img'
  | 'input'
  | 'link'
  | 'meta'
  | 'param'
  | 'source'
  | 'track'
  | 'wbr'
>;

interface RepeatPropsBase {
  /**
   * 반복할 요소 또는 인덱스를 받아 요소를 반환하는 함수
   */
  children: ((index: number) => ReactNode) | ReactNode;
  /**
   * 정렬 순서
   * - 'asc': 오름차순 (0, 1, 2, ...)
   * - 'desc': 내림차순 (..., 2, 1, 0)
   * @default 'asc'
   */
  order?: 'asc' | 'desc';
  /**
   * 반복할 횟수
   */
  times: number;
}

// as prop 없이 사용할 때의 props
type RepeatPropsWithoutAs = {
  /**
   * 렌더링할 HTML 요소 타입
   * 지정하지 않으면 Fragment를 사용합니다 (Fragment는 HTML 속성을 가질 수 없음)
   */
  as?: never;
} & RepeatPropsBase;

// as prop과 함께 사용할 때의 props
type RepeatPropsWithAs<T extends NonVoidElement> = {
  /**
   * 렌더링할 HTML 요소 타입 (void element는 사용할 수 없습니다)
   */
  as: T;
} & React.JSX.IntrinsicElements[T] &
  RepeatPropsBase;

/**
 * children을 지정된 횟수만큼 반복하여 렌더링하는 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 사용 (children을 반복, Fragment 사용)
 * <Repeat times={3}>
 *   <span>Hello</span>
 * </Repeat>
 *
 * // 함수형 children 사용 (인덱스 전달)
 * <Repeat times={10}>
 *   {(i) => <Step key={i} id={`step-${i}`} />}
 * </Repeat>
 *
 * // as prop 지정 시 해당 요소의 정확한 HTML 속성 사용 가능
 * <Repeat
 *   times={3}
 *   order="desc"
 *   as="div"
 *   className="container"
 *   id="repeat-container"
 *   data-testid="repeat"
 * >
 *   <span>Hello</span>
 * </Repeat>
 * ```
 *
 * @param props - Repeat 컴포넌트의 props
 * @param props.children - 반복할 React 요소 또는 인덱스를 받아 요소를 반환하는 함수
 * @param props.order - 정렬 순서 ('asc' | 'desc', 기본값: 'asc')
 * @param props.times - 반복할 횟수
 * @param props.as - 렌더링할 HTML 요소 타입 (void element는 사용할 수 없음, 지정 시 해당 요소의 정확한 HTML 속성 사용 가능)
 * @returns 지정된 횟수만큼 반복된 children을 as 태그로 감싼 요소 (as가 없으면 Fragment)
 */
// as prop 없이 사용하는 경우
function Repeat(props: RepeatPropsWithoutAs): React.JSX.Element;
// as prop과 함께 사용하는 경우 (해당 요소의 HTML 속성 사용 가능)
function Repeat<T extends NonVoidElement>(props: RepeatPropsWithAs<T>): React.JSX.Element;
function Repeat<T extends NonVoidElement>({
  as,
  children,
  order = 'asc',
  times,
  ...htmlProps
}: RepeatPropsWithAs<T> | RepeatPropsWithoutAs) {
  const items = range(times);
  const sortedItems = order === 'asc' ? items : [...items].reverse();
  const isFunctionChildren = typeof children === 'function';

  const content = sortedItems.map((index) => {
    const child = isFunctionChildren ? children(index) : children;

    return <Fragment key={index}>{child}</Fragment>;
  });

  if (as === undefined) {
    return <>{content}</>;
  }

  return createElement(as, htmlProps as React.JSX.IntrinsicElements[T], content);
}

export { Repeat };
