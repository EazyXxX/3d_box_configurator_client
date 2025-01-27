import { BoxDimensions, Vertex, Triangle, BoxData } from "../../app/types";
import { Handler, HandlerEvent } from "@netlify/functions";

// Box triangulation calculation function
function calculateBoxTriangulation(dimensions: BoxDimensions): BoxData {
  const { length: l, width: w, height: h } = dimensions;

  // Defining the 8 vertices of the box
  const vertices: Vertex[] = [
    { x: 0, y: 0, z: 0 }, // 0: Front bottom left
    { x: l, y: 0, z: 0 }, // 1: Front bottom right
    { x: l, y: h, z: 0 }, // 2: Front upper right
    { x: 0, y: h, z: 0 }, // 3: Front upper left
    { x: 0, y: 0, z: w }, // 4: Rear lower left
    { x: l, y: 0, z: w }, // 5: Rear lower right
    { x: l, y: h, z: w }, // 6: Rear upper right
    { x: 0, y: h, z: w }, // 7: Rear upper left
  ];

  // Definition of 12 triangles (2 for each face)
  const triangles: Triangle[] = [
    // Front face
    { v1: vertices[0], v2: vertices[1], v3: vertices[2] },
    { v1: vertices[0], v2: vertices[2], v3: vertices[3] },

    // Rear face
    { v1: vertices[5], v2: vertices[4], v3: vertices[7] },
    { v1: vertices[5], v2: vertices[7], v3: vertices[6] },

    // Upper face
    { v1: vertices[3], v2: vertices[2], v3: vertices[6] },
    { v1: vertices[3], v2: vertices[6], v3: vertices[7] },

    // Bottom face
    { v1: vertices[4], v2: vertices[5], v3: vertices[1] },
    { v1: vertices[4], v2: vertices[1], v3: vertices[0] },

    // Right face
    { v1: vertices[1], v2: vertices[5], v3: vertices[6] },
    { v1: vertices[1], v2: vertices[6], v3: vertices[2] },

    // Left face
    { v1: vertices[4], v2: vertices[0], v3: vertices[3] },
    { v1: vertices[4], v2: vertices[3], v3: vertices[7] },
  ];

  return {
    triangles,
  };
}

// Netlify Handler
export const handler: Handler = async (event: HandlerEvent) => {
  try {
    const body = JSON.parse(event.body || "{}");

    if (!body || !body.dimensions) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing 'dimensions' in request body" }),
      };
    }

    const dimensions: BoxDimensions = body.dimensions;

    const result = calculateBoxTriangulation(dimensions);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
