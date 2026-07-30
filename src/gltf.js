import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { MeshoptDecoder } from 'meshoptimizer';

let ioPromise;

async function getIO() {
  ioPromise ??= (async () => {
    const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
    await MeshoptDecoder.ready;
    const deps = { 'meshopt.decoder': MeshoptDecoder };
    try {
      const draco3d = (await import('draco3dgltf')).default;
      deps['draco3d.decoder'] = await draco3d.createDecoderModule();
    } catch {
      // draco3dgltf is only needed for Draco-compressed inputs; loading a
      // Draco file without it will fail with gltf-transform's own error.
    }
    return io.registerDependencies(deps);
  })();
  return ioPromise;
}

/** First 4 bytes of a GLB container: the ASCII magic "glTF", little-endian. */
const GLB_MAGIC = 0x46546c67;

function isGlb(bytes) {
  if (bytes.byteLength < 4) return false;
  return (
    new DataView(bytes.buffer, bytes.byteOffset, 4).getUint32(0, true) === GLB_MAGIC
  );
}

/**
 * Read either container into a Document.
 *
 * A path is preferred: NodeIO resolves a `.gltf` file's external `.bin` and
 * image URIs relative to it. Raw bytes still work for GLB and for a
 * self-contained `.gltf` whose buffers are data URIs.
 */
async function readDocument(io, source) {
  if (typeof source === 'string') return io.read(source);
  const bytes = source instanceof Uint8Array ? source : new Uint8Array(source);
  if (isGlb(bytes)) return io.readBinary(bytes);
  let json;
  try {
    json = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error('not a glTF file: neither a GLB container nor valid glTF JSON');
  }
  return io.readJSON({ json, resources: {} });
}

/**
 * Load a GLB or glTF and return its triangles in world space (still Y-up).
 * Every TRIANGLES primitive of every mesh in every scene is included, with
 * node transforms baked in.
 *
 * `source` is a file path (preferred: resolves external `.bin`/textures) or the
 * file's bytes.
 */
export async function loadGltfTriangles(source) {
  const io = await getIO();
  const doc = await readDocument(io, source);
  const triangles = [];
  for (const scene of doc.getRoot().listScenes()) {
    scene.traverse((node) => {
      const mesh = node.getMesh();
      if (!mesh) return;
      const m = node.getWorldMatrix();
      for (const prim of mesh.listPrimitives()) {
        if (prim.getMode() !== 4) continue; // TRIANGLES only
        const pos = prim.getAttribute('POSITION');
        if (!pos) continue;
        const idx = prim.getIndices();
        const count = idx ? idx.getCount() : pos.getCount();
        for (let i = 0; i + 2 < count; i += 3) {
          const tri = [];
          for (let j = 0; j < 3; j++) {
            const vi = idx ? idx.getScalar(i + j) : i + j;
            const [x, y, z] = pos.getElement(vi, []);
            tri.push([
              m[0] * x + m[4] * y + m[8] * z + m[12],
              m[1] * x + m[5] * y + m[9] * z + m[13],
              m[2] * x + m[6] * y + m[10] * z + m[14],
            ]);
          }
          triangles.push(tri);
        }
      }
    });
  }
  return triangles;
}
