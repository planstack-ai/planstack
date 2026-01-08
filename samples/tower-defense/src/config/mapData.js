// Map configuration
export const TILE_SIZE = 32
export const MAP_WIDTH = 20  // tiles
export const MAP_HEIGHT = 15 // tiles

// Path waypoints (in tile coordinates)
// Enemy walks from waypoint to waypoint
export const PATH_WAYPOINTS = [
  { x: 0, y: 7 },   // Start (left edge, middle)
  { x: 3, y: 7 },
  { x: 3, y: 3 },
  { x: 8, y: 3 },
  { x: 8, y: 11 },
  { x: 14, y: 11 },
  { x: 14, y: 5 },
  { x: 19, y: 5 }   // End (right edge)
]

// Generate path tiles from waypoints
export function generatePathTiles() {
  const pathTiles = new Set()

  for (let i = 0; i < PATH_WAYPOINTS.length - 1; i++) {
    const from = PATH_WAYPOINTS[i]
    const to = PATH_WAYPOINTS[i + 1]

    // Horizontal or vertical line between waypoints
    const minX = Math.min(from.x, to.x)
    const maxX = Math.max(from.x, to.x)
    const minY = Math.min(from.y, to.y)
    const maxY = Math.max(from.y, to.y)

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        pathTiles.add(`${x},${y}`)
      }
    }
  }

  return pathTiles
}

// Check if a tile is buildable (not on path, within bounds)
export function isBuildableTile(tileX, tileY, pathTiles) {
  if (tileX < 0 || tileX >= MAP_WIDTH || tileY < 0 || tileY >= MAP_HEIGHT) {
    return false
  }
  return !pathTiles.has(`${tileX},${tileY}`)
}

// Convert tile coordinates to pixel coordinates (center of tile)
export function tileToPixel(tileX, tileY) {
  return {
    x: tileX * TILE_SIZE + TILE_SIZE / 2,
    y: tileY * TILE_SIZE + TILE_SIZE / 2
  }
}

// Convert pixel coordinates to tile coordinates
export function pixelToTile(pixelX, pixelY) {
  return {
    x: Math.floor(pixelX / TILE_SIZE),
    y: Math.floor(pixelY / TILE_SIZE)
  }
}
