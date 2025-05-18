% === RULES ===
% 어떤 사례(Case)가 어떤 패턴(Pattern)을 따르고, 그 패턴이 어떤 법(Law)을 위반하는지 추론
violates(Case, Pattern, Law) :-
    case_predicate(Case, Predicate),
    predicate_type(Predicate, Pattern),
    type_law(Pattern, Law).
