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

- all the logic is in src/robots.ts, vue is just there for the input/output
- if a robot goes off the grid its lost, it stays at the last position and LOST gets printed
- when a robot is lost it leaves a scent on that square, other robots just ignore a move off the grid from there
