# Redbadger Technical Assessment

Martian robots challenge, done in vue 3 + typescript

## Running

needs node 18 or newer

```sh
npm install
npm run dev
```

then open http://localhost:5173, the sample input from the brief is already in the box, hit run and you get the output underneath. sample.txt in the root has the same input if you want to copy it

## Testing

```sh
npm test
```

## Notes

- all the logic is in src/robots.ts, vue is just there for the input/output
- if a robot goes off the grid its lost, it stays at the last position and LOST gets printed
- when a robot is lost it leaves a scent on that square, other robots just ignore a move off the grid from there
- commands are in a map (L, R, F) so adding a new one is just another entry, the brief said more might come later
- input gets checked against the limits in the brief (coords 0 to 50, instructions under 100 chars, only L R F)

## Next steps

- show the robots on a grid instead of just text output
- let you upload a file instead of pasting
- maybe move the command map to its own file if more commands get added
