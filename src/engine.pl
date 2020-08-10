valid_move([], Hand, Card):- member(Card, Hand).

valid_move([First_Card | _Rest], Hand, Card):-
    member(Card, Hand),
    card(suit(S), _) = First_Card,
    card(suit(S), _) = Card.

valid_move([First_Card | _Rest], Hand, Card):-
    member(Card, Hand),
    card(suit(S), _) = First_Card,
    \+(member(card(suit(S), _), Hand)).

value(rank('A'), 13).
value(rank('K'), 12).
value(rank('Q'), 11).
value(rank('J'), 10).
value(rank('10'), 9).
value(rank('9'), 8).
value(rank('8'), 7).
value(rank('7'), 6).
value(rank('6'), 5).
value(rank('5'), 4).
value(rank('4'), 3).
value(rank('3'), 2).
value(rank('2'), 1).

is_higher_rank(Pile_Rank, Played_Rank):-
    value(Played_Rank, Played_Value),
    value(Pile_Rank, Pile_Value),
    Played_Value > Pile_Value.

is_highest_card([], _, _, _) :- true.
is_highest_card([Pile_Card| Rest], Played_Card, Trump_Suit, _):-
    card(Trump_Suit, Played_Rank) = Played_Card,
    card(Trump_Suit, Pile_Rank) = Pile_Card,
    !,
    is_higher_rank(Pile_Rank, Played_Rank),
    is_highest_card(Rest, Played_Card, Trump_Suit, _).

is_highest_card([_| Rest], Played_Card, Trump_Suit, _):-
    card(Trump_Suit, _) = Played_Card,
    is_highest_card(Rest, Played_Card, Trump_Suit, _).

is_highest_card([Pile_Card| Rest], Played_Card, _, Played_Suit):-
    card(Played_Suit, Played_Rank) = Played_Card,
    card(Played_Suit, Pile_Rank) = Pile_Card,
    !,
    is_higher_rank(Pile_Rank, Played_Rank),
    is_highest_card(Rest, Played_Card, _, Played_Suit).

is_highest_card([_| Rest], Played_Card, _, Played_Suit):-
    card(Played_Suit, _) = Played_Card,
    is_highest_card(Rest, Played_Card, _, Played_Suit).

is_highest_card([], _, _):- true.
is_highest_card(Pile, Card, Trump_Suit):-
    [card(Played_Suit, _) | _] = Pile,
    is_highest_card(Pile, Card, Trump_Suit, Played_Suit).