function cubicSplineInterpolation(pointsX, pointsY) {
  const n = pointsX.length
  const h = []
  const alpha = []
  const l = []
  const mu = []
  const z = []
  const c = []
  const b = []
  const d = []

  for (let i = 0; i < n - 1; i++) {
    h[i] = pointsX[i + 1] - pointsX[i]
    alpha[i] = (3 / h[i]) * (pointsY[i + 1] - pointsY[i]) - (3 / h[i - 1]) * (pointsY[i] - pointsY[i - 1])
  }

  l[0] = 1
  mu[0] = 0
  z[0] = 0

  for (let i = 1; i < n - 1; i++) {
    l[i] = 2 * (pointsX[i + 1] - pointsX[i - 1]) - h[i - 1] * mu[i - 1]
    mu[i] = h[i] / l[i]
    z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i]
  }

  l[n - 1] = 1
  z[n - 1] = 0
  c[n - 1] = 0

  for (let j = n - 2; j >= 0; j--) {
    c[j] = z[j] - mu[j] * c[j + 1]
    b[j] = (pointsY[j + 1] - pointsY[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3
    d[j] = (c[j + 1] - c[j]) / (3 * h[j])
  }

  return { b, c, d }
}

function interpolateCubicSpline(pointsX, pointsY, resolution) {
  const { b, c, d } = cubicSplineInterpolation(pointsX, pointsY)

  const curve = []
  for (let i = 0; i < pointsX.length - 1; i++) {
    const h = pointsX[i + 1] - pointsX[i]
    for (let j = 0; j <= resolution; j++) {
      const delta = pointsX[i + 1] - pointsX[i]
      const t = pointsX[i] + (delta / resolution) * j
      const deltaX = t - pointsX[i]
      const interpolatedY =
        pointsY[i] + b[i] * deltaX + c[i] * deltaX ** 2 + d[i] * deltaX ** 3
      curve.push({ x: t, y: interpolatedY })
    }
  }

  return curve
}

module.exports = { interpolateCubicSpline }
