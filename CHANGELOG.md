# Changelog

## 0.1.1 - 2026-07-30

- Fix: `.gltf` input failed with "Invalid glTF 2.0 binary." The glTF reader always
  used the GLB code path, so only `.glb` files ever worked despite `.gltf` being
  advertised in the CLI, the README, and the package description. The loader now
  detects the container and, for a file path, resolves a `.gltf`'s external `.bin`
  and image resources relative to it.
- `loadGltfTriangles()` accepts a file path as well as bytes.
- Add `package-lock.json` so `npm ci` reproduces the dependency tree.
- Add a `Gemfile` for the `docs/` Jekyll site; it could not be built outside
  GitHub Pages because its theme and plugins were never declared.
- Docs: correct the `POST /api/forge` example (it returns a `job_id` to poll, not
  a `glbUrl`), point the MCP link at a live page, and stop advertising the
  GitHub Pages URL, which is not published.

## 0.1.0 - 2026-07-13

Initial release.

- Convert GLB, glTF (incl. Draco and meshopt compression), OBJ, binary STL, and ASCII STL into GitHub-renderable ASCII STL markdown blocks.
- Mesh welding + three-stage simplification (meshoptimizer) to a `--facets` or `--budget` target: floater pruning, quadric simplification, and a topology-ignoring sloppy fallback that guarantees the target on disconnected meshes.
- Coordinate normalization, Y-up → Z-up correction, precision trimming.
- `readme-3d check` - size-check any markdown file against GitHub's 512 KB render limit.
- Library API: `convert`, `toMarkdown`, `checkMarkdownFile`, plus geometry/parser primitives.
- Tutorials, examples, a GitHub Pages site, and a Claude Code skill.
