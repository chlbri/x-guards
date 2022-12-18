export type SingleOrArray<T> = T | T[];

export type SimpleGuardDef<TA = any, TC = any> = (
  context: TC,
  event: TA,
) => boolean;

export type GuardDefUnion<TA = any, TC = any> =
  | GuardDefAnd<TA, TC>
  | GuardDefOr<TA, TC>
  | SimpleGuardDef<TA, TC>;

export type GuardDefAnd<TA = any, TC = any> = {
  and: SingleOrArray<GuardDefUnion<TA, TC>>;
};

export type GuardDefOr<TA = any, TC = any> = {
  or: SingleOrArray<GuardDefUnion<TA, TC>>;
};

export type GuardDefs<TA = any, TC = any> = SingleOrArray<
  GuardDefUnion<TA, TC>
>;
