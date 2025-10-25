function cubicSplineInterpolation(points, parameterValues) {
  const n = points.length;
  const h = [];
  const alpha = [];
  const l = [];
  const mu = [];
  const z = [];
  const c = [];
  const b = [];
  const d = [];

  for (let i = 0; i < n - 1; i++) {
    h[i] = parameterValues[i + 1] - parameterValues[i];
  }

  for (let i = 1; i < n - 1; i++) {
    alpha[i] = (3 / h[i]) * (points[i + 1] - points[i]) - 
               (3 / h[i - 1]) * (points[i] - points[i - 1]);
  }

  l[0] = 1;
  mu[0] = 0;
  z[0] = 0;

  for (let i = 1; i < n - 1; i++) {
    l[i] = 2 * (parameterValues[i + 1] - parameterValues[i - 1]) - h[i - 1] * mu[i - 1];
    mu[i] = h[i] / l[i];
    z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
  }

  l[n - 1] = 1;
  z[n - 1] = 0;
  c[n - 1] = 0;

  for (let j = n - 2; j >= 0; j--) {
    c[j] = z[j] - mu[j] * c[j + 1];
    b[j] = (points[j + 1] - points[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
    d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
  }

  return { b, c, d, a: points };
}

function interpolateParametricCubicSpline(pointsX, pointsY, resolution) {
  const n = pointsX.length;

  const parameterValues = [0];
  for (let i = 1; i < n; i++) {
    const dx = pointsX[i] - pointsX[i - 1];
    const dy = pointsY[i] - pointsY[i - 1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    parameterValues.push(parameterValues[i - 1] + distance);
  }

  const splineX = cubicSplineInterpolation(pointsX, parameterValues);
  const splineY = cubicSplineInterpolation(pointsY, parameterValues);

  const curve = [];
  
  for (let i = 0; i < n - 1; i++) {
    const tStart = parameterValues[i];
    const tEnd = parameterValues[i + 1];
    
    for (let j = 0; j <= resolution; j++) {
      const t = tStart + ((tEnd - tStart) / resolution) * j;
      const dt = t - parameterValues[i];
      
      const x = splineX.a[i] + 
                splineX.b[i] * dt + 
                splineX.c[i] * dt ** 2 + 
                splineX.d[i] * dt ** 3;
      
      const y = splineY.a[i] + 
                splineY.b[i] * dt + 
                splineY.c[i] * dt ** 2 + 
                splineY.d[i] * dt ** 3;
      
      curve.push({ x, y });
    }
  }
  
  return curve;
}

export default interpolateParametricCubicSpline;