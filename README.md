# Redbadger Technical Assessment

## Running

```sh
npm install
npm run dev
```

## Testing

```sh
npm test
```

## Notes

- all the logic is in src/robots.ts, vue is just there for the input/output. run npm run dev, paste the input and hit run
- if a robot goes off the grid its lost, it stays at the last position and LOST gets printed
- when a robot is lost it leaves a scent on that square, other robots just ignore a move off the grid from there
- commands are in a map (L, R, F) so adding a new one is just another entry, the brief said more might come later
- input gets checked against the limits in the brief (coords 0 to 50, instructions under 100 chars, only L R F)

## Next steps

- show the robots on a grid instead of just text output
- let you upload a file instead of pasting
- maybe move the command map to its own file if more commands get added
