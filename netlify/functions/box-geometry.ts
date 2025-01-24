import { BoxDimensions, Vertex, Triangle, BoxData } from "../../app/types";
import { Handler, HandlerEvent } from "@netlify/functions";

// Функция расчёта триангуляции коробки
function calculateBoxTriangulation(dimensions: BoxDimensions): BoxData {
  const { length: l, width: w, height: h } = dimensions;

  // Определение 8 вершин коробки
  const vertices: Vertex[] = [
    { x: 0, y: 0, z: 0 }, // 0: передний нижний левый
    { x: l, y: 0, z: 0 }, // 1: передний нижний правый
    { x: l, y: h, z: 0 }, // 2: передний верхний правый
    { x: 0, y: h, z: 0 }, // 3: передний верхний левый
    { x: 0, y: 0, z: w }, // 4: задний нижний левый
    { x: l, y: 0, z: w }, // 5: задний нижний правый
    { x: l, y: h, z: w }, // 6: задний верхний правый
    { x: 0, y: h, z: w }, // 7: задний верхний левый
  ];

  // Определение 12 треугольников (по 2 на каждую грань)
  const triangles: Triangle[] = [
    // Передняя грань
    { v1: vertices[0], v2: vertices[1], v3: vertices[2] },
    { v1: vertices[0], v2: vertices[2], v3: vertices[3] },

    // Задняя грань
    { v1: vertices[5], v2: vertices[4], v3: vertices[7] },
    { v1: vertices[5], v2: vertices[7], v3: vertices[6] },

    // Верхняя грань
    { v1: vertices[3], v2: vertices[2], v3: vertices[6] },
    { v1: vertices[3], v2: vertices[6], v3: vertices[7] },

    // Нижняя грань
    { v1: vertices[4], v2: vertices[5], v3: vertices[1] },
    { v1: vertices[4], v2: vertices[1], v3: vertices[0] },

    // Правая грань
    { v1: vertices[1], v2: vertices[5], v3: vertices[6] },
    { v1: vertices[1], v2: vertices[6], v3: vertices[2] },

    // Левая грань
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
