# Parametric Cubic Spline

Given a set of (x,y) coordinates, and a resolution (number of values of t to calculate over the curve), interpolate a parametric cubic spline.

```
const interpolate = require('parametric-cubic-spline')
const pointsX = // Array of X values
const pointsY = // Array of Y values
const resolution = // number of values of t to calculate over the curve

const points = interpolate(pointsX, pointsY, resolution) // Array of objects {x, y, t}. Graphing the x,y values in order will yield the parametric curve
```
