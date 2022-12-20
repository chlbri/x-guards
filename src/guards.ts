export * from './types';

import { returnFalse, returnTrue } from './helpers';
import type { GuardDefs, GuardDefUnion, SimpleGuardDef } from './types';

function reduceGuardsAnd<TA = any, TC extends object = object>(
  ...values: GuardDefUnion<TA, TC>[]
): SimpleGuardDef<TA, TC> {
  return values.reduce((acc: SimpleGuardDef<TA, TC>, value) => {
    const guard = reduceGuards(value);
    return (context, args) => acc(context, args) && guard(context, args);
  }, returnTrue);
}

function reduceGuardsOr<TA = any, TC extends object = object>(
  ...values: GuardDefUnion<TA, TC>[]
): SimpleGuardDef<TA, TC> {
  return values.reduce((acc: SimpleGuardDef<TA, TC>, value) => {
    const guard = reduceGuards(value);
    return (context, args) => acc(context, args) || guard(context, args);
  }, returnFalse);
}

export default function reduceGuards<TA = any, TC extends object = object>(
  values?: GuardDefs<TA, TC>,
): SimpleGuardDef<TA, TC> {
  if (!values) return returnTrue;
  if (typeof values === 'function') {
    return values;
  }
  if ('and' in values) {
    const and = values.and;
    if (Array.isArray(and)) {
      return reduceGuardsAnd(...and);
    }
    return reduceGuardsAnd(and);
  }
  if ('or' in values) {
    const or = values.or;
    if (Array.isArray(or)) {
      return reduceGuardsOr(...or);
    }
    return reduceGuardsOr(or);
  }
  return reduceGuardsAnd(...values);
}
