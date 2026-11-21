# Methods: Dynamic arena instancing

## Two-match test (user)
1. In Studio: Test > Clients and Servers, 4 players.
2. Seat 2 players at one 1v1 table and 2 at another table; both hosts press Start.
3. Expect: both drafts run at once; both matches start (no "Arena busy"); each pair fights in its own arena (2000 studs apart); a knocked-out player in a 3+ player match only sees fighters of their own match.
4. After each match ends, check Server Explorer: Workspace.Arenas has no leftover Arena_0 or Arena_1 for finished matches.
