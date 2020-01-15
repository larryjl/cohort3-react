const functions = {
  forward(point, direction, distance) {
    // direction is an array: [1,0], [-1,0], [0,1] or [0,-1]
    return {
      point: point.map((v,i) => (
        v + (distance * direction[i])
      )),
      direction: direction
    };
  },
  turnLeft(point, prevDirection) {
    let [x, y] = prevDirection;
    // convert signed -0 to 0
    return {
      point: point,
      direction: [(-y)?-y:0, x]
    };
  },
  turnRight(point,prevDirection) {
    let [x, y] = prevDirection;
    return {
      point: point,
      direction: [y, (-x)?-x:0]
    };
  }
};

export default functions;