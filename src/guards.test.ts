import { describe, expect, test } from 'vitest';
import reduceGuards from './guards';
import { returnFalse, returnTrue } from './helpers';
import { SimpleGuardDef } from './types';

test('Not guards return empty boolean func', () => {
  expect(reduceGuards()).toEqual(returnTrue);
});

describe('#1: And', () => {
  test('#1', () => {
    const guard = reduceGuards({
      and: returnTrue,
    });
    //@ts-ignore For Test
    expect(guard()).toBe(true);
  });
  test('#2', () => {
    const guard = reduceGuards({
      and: [returnTrue, returnTrue],
    });
    //@ts-ignore For Test
    expect(guard()).toBe(true);
  });
  test('#3', () => {
    const guard = reduceGuards({
      and: [returnFalse, returnTrue],
    });
    //@ts-ignore For Test
    expect(guard()).toBe(false);
  });
  test('#4', () => {
    const guard1: SimpleGuardDef<{ val: boolean }> = ctx => ctx.val;
    const guard = reduceGuards({
      and: guard1,
    });
    //@ts-ignore For Test
    expect(guard({ val: true })).toBe(true);
  });
});

describe('Array', () => {
  test('#1', () => {
    const guard = reduceGuards([returnTrue, returnTrue]);
    //@ts-ignore For Test
    expect(guard()).toBe(true);
  });
  test('#2', () => {
    const guard = reduceGuards([returnTrue, returnFalse]);
    //@ts-ignore For Test
    expect(guard()).toBe(false);
  });
});

describe('#1: Or', () => {
  test('#1', () => {
    const guard = reduceGuards({
      or: returnTrue,
    });
    //@ts-ignore For Test
    expect(guard()).toBe(true);
  });
  test('#2', () => {
    const guard = reduceGuards({
      or: [returnTrue, returnTrue],
    });
    //@ts-ignore For Test
    expect(guard()).toBe(true);
  });
  test('#3', () => {
    const guard = reduceGuards({
      or: [returnFalse, returnTrue],
    });
    //@ts-ignore For Test
    expect(guard()).toBe(true);
  });
  test('#4', () => {
    const guard1: SimpleGuardDef<{ val: boolean }> = ctx => ctx.val;
    const guard = reduceGuards({
      or: guard1,
    });
    //@ts-ignore For Test
    expect(guard({ val: false })).toBe(false);
  });
});
