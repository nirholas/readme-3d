# Getting started with readme-3d

Put interactive, rotatable 3D models in your GitHub README. Converts GLB, glTF, OBJ, and binary STL into the ASCII STL markdown blocks GitHub renders natively - with mesh simplification to fit the 512 KB markdown budget.

## Install

```bash
npx readme-3d model.glb >> README.md
```

## Verify the install

Clone the repository and run its checks to confirm everything works on your machine:

```bash
git clone https://github.com/nirholas/readme-3d.git
cd readme-3d
```

Available commands:

| Command | Runs |
|---|---|
| `npm run test` | `node --test test/*.test.js` |

## Next steps

- [Examples](./examples.md) shows runnable snippets.
- The [README](https://github.com/nirholas/readme-3d#readme) is the complete reference.
- Found a problem? [Open an issue](https://github.com/nirholas/readme-3d/issues).
