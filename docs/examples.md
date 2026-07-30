# readme-3d examples

Put interactive, rotatable 3D models in your GitHub README. Converts GLB, glTF, OBJ, and binary STL into the ASCII STL markdown blocks GitHub renders natively - with mesh simplification to fit the 512 KB markdown budget.

## Example 1

```bash
# convert any GLB into a markdown block and append it to your README
npx readme-3d model.glb >> README.md

# or write it to its own file, capped at 150 KB
npx readme-3d model.glb --budget 150kb -o model.md

# sanity-check that your README stays under GitHub's 512 KB render limit
npx readme-3d check README.md
```

## Example 2

```text
readme-3d <model.(glb|gltf|stl|ast|obj)> [options]   convert a model
readme-3d check <file.md>                            size-check a markdown file

-o, --out <file>     write the markdown block to a file (default: stdout)
    --stl <file>     also write the raw ASCII STL to a file
    --facets <n>     max triangle count (default 1500)
    --budget <size>  max output size, e.g. 200kb (overrides --facets downward)
    --name <name>    solid name inside the STL (default: input filename)
    --precision <n>  coordinate decimals (default 2)
    --up <y|z>       source up-axis (default: y for glb/gltf/obj, z for stl)
    --details        wrap the block in a collapsed <details> section
    --no-normalize   keep original coordinates (skip rescale/grounding)
```

## Example 3

```text
Lower-level primitives are exported too: `loadTriangles`, `simplifyTriangles`, `writeAsciiStl`, `parseStl`, `parseObj`, `normalize`, `yUpToZUp`.

## Choosing a budget

Rough sizing at the default precision (2 decimals): **one facet ≈ 145 bytes.**

| Facets | Block size | Good for |
| ---: | ---: | --- |
| 300 | ~45 KB | icons, simple parts, several models per page |
| 600 | ~90 KB | hero model in a README that has lots of other content |
| 1,500 | ~215 KB | detailed hero model, default |
| 3,000 | ~430 KB | dedicated model page with little other text |

GitHub renders markdown files up to **512 KB** - beyond that the whole file displays as raw text. `readme-3d check README.md` tells you exactly where you stand. Full math and tips: [size-budget tutorial](docs/tutorials/04-size-budgets.md).

## The full text-to-README pipeline

You don't even need a model. [three.ws Forge](https://three.ws/forge) generates a textured GLB from a text prompt, free, no account. Generation is asynchronous: the submit call returns a `job_id`, and you poll the same endpoint until `status` is `done`.
```

## Example 4

```text
Walkthrough: [text → 3D → README in five minutes](docs/tutorials/03-text-to-3d-avatar.md).

## More examples

* [`examples/cube.md`](examples/cube.md) - the minimal hand-written cube
* [`examples/torus.md`](examples/torus.md) - parametric mesh, simplified 2,304 → 700 facets
* [`examples/avatar.md`](examples/avatar.md) - AI-generated avatar, 10,194 → 1,200 facets

## Tutorials

1. [Hello, 3D markdown](docs/tutorials/01-hello-3d-markdown.md) - your first embedded model in five minutes
2. [Convert a GLB](docs/tutorials/02-convert-a-glb.md) - the CLI end to end
3. [Text → 3D → README](docs/tutorials/03-text-to-3d-avatar.md) - generate a model with AI and embed it
4. [Size budgets](docs/tutorials/04-size-budgets.md) - the 512 KB limit and how to spend it
5. [Beyond the README](docs/tutorials/05-issues-prs-discussions.md) - 3D in issues, PRs, discussions, and gists

## Claude / AI-agent support

This repo ships a [Claude Code skill](skills/3d-in-readme/SKILL.md) and [ready-made prompts](prompts/) so an AI agent can do the whole pipeline for you - "add a 3D model of X to my README" becomes a one-liner. Clone the repo (or copy `skills/` into your project's `.claude/skills/`) and Claude Code picks it up automatically.

## Where STL blocks render

| Surface | Renders? |
| --- | --- |
| README / any `.md` file on github.com | ✅ |
| Issues, pull requests, discussions, gists | ✅ |
| GitHub mobile app | ✅ |
| npmjs.com package page | ❌ shows raw text |
| GitLab / Bitbucket / VS Code preview | ❌ shows raw text |

## FAQ

**Why is my model monochrome?** GitHub's STL viewer renders geometry only - STL has no color or texture. Pick models with a strong silhouette.

**Why does my model lie on its back?** Your source is Y-up and was embedded without axis correction. `readme-3d` corrects glTF/OBJ automatically; use `--up y` to force it for other sources.

**Can I embed more than one model?** Yes - each `
```


Every snippet above is taken from the [repository documentation](https://github.com/nirholas/readme-3d#readme).
